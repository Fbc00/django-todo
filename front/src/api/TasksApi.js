import api from "@/api";

export default {
  getTasks: (callback) => {
    api.get("http://localhost:8000/api/tasks").then((response) => {
      callback(response.data);
    });
  },
  getGroups: (callback) => {
    api.get("http://localhost:8000/api/projects").then((response) => {
      callback(response.data);
    });
  },
  createGroups: (data) => {
    return api.post("http://localhost:8000/api/projects", data);
  },
  delGroups: (id, callback) => {
    api.delete(`http://localhost:8000/api/projects/${id}`).then((response) => {
      callback(response.data);
    });
  },
  delTasks: (id, callback) => {
    api.delete(`http://localhost:8000/api/tasks/${id}`).then((response) => {
      callback(response.data);
    });
  },
  addTasks: (task, callback) => {
    api.post("http://localhost:8000/api/tasks/", task).then((response) => {
      callback(response.data);
    });
  },
  updateTask: (task, callback) => {
    api
      .post(`http://localhost:8000/api/tasks/${task.id}`, task)
      .then((response) => {
        callback(response.data);
      });
  },
  summary: () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/tasks/summary")
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },
};
