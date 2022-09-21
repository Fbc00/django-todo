const data = require("../data");
const auth = require("./auth");

function getMaxId(items) {
  return Math.max(...items.map((item) => item.id));
}

module.exports = {
  find: (req, res) => {
    const loggedUser = auth.loginRequired(req, res);
    if (!loggedUser) {
      return;
    }
    const { id } = req.params;
    if (id != undefined) {
      const task = data.projects.find((t) => t.id == id);
      if (!task || task.userId != loggedUser.id) {
        res.status(404).end();
        return;
      }
      res.send(task);
      return;
    }
    res.send(data.projects.filter((t) => t.userId == loggedUser.id));
  },
  add: (req, res) => {
    const loggedUser = auth.loginRequired(req, res);
    if (!loggedUser) {
      return;
    }
    const { name } = req.body;
    const id = getMaxId(data.projects) + 1;
    const newTask = {
      id,
      name,
      userId: loggedUser.id,
    };
    data.projects.push(newTask);
    res.send(newTask);
  },
  update: (req, res) => {
    const loggedUser = auth.loginRequired(req, res);
    if (!loggedUser) {
      return;
    }
    const { id } = req.params;
    const task = data.projects.find((t) => t.id == id);
    if (!id || !task || task.userId != loggedUser.id) {
      res.status(404).end();
      return;
    }
    const { title, project, status } = req.body;
    task.title = title;
    task.project = project;
    task.status = status;
    res.send(task);
  },
  remove: (req, res) => {
    const loggedUser = auth.loginRequired(req, res);
    if (!loggedUser) {
      return;
    }
    const { id } = req.params;
    const task = data.projects.find((t) => t.id == id);
    const index = data.projects.indexOf(task);
    data.projects.splice(index, 1);
    res.send(task);
  },
  summary: (req, res) => {
    const loggedUser = auth.loginRequired(req, res);
    if (!loggedUser) {
      return;
    }
    let projectsummary = {};
    const userprojects = data.projects.filter((t) => t.userId == loggedUser.id);
    for (let task of userprojects) {
      const key = task.project;
      if (!projectsummary.hasOwnProperty(key)) {
        projectsummary[key] = {
          pending: 0,
          working: 0,
          done: 0,
        };
      }
      projectsummary[key][task.status] += 1;
    }
    res.send(projectsummary);
  },
};
