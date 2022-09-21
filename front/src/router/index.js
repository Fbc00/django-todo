import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ResumePainel from "@/views/ResumePainel.vue";
import NewUser from "@/views/NewUser.vue";
import TasksList from "@/views/TasksList.vue";
import GroupsForm from "@/views/GroupsForm.vue";
import addTask from "@/views/NewTask.vue";
import updateTask from "@/views/UpdateTask";
import BaseList from "@/views/BaseList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/resume",
    name: "resume",
    component: ResumePainel,
  },
  {
    path: "/register",
    name: "register",
    component: NewUser,
  },
  {
    path: "/tasksList",
    component: BaseList,
    children: [
      {
        path: "add",
        name: "addTask",
        component: addTask,
      },
      {
        path: "/",
        name: "TasksList",
        component: TasksList,
      },
      {
        path: ":id",
        name: "taskUpdate",
        component: updateTask,
      },
    ],
  },
  {
    path: "/groupsForm",
    name: "groupsForm",
    component: GroupsForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
