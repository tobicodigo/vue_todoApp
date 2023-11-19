import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import ProfileView from "../views/ProfileView.vue";
import FilterView from "../views/FilterView.vue";
import AddTaskView from "../views/AddTaskView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: MainView,
  },
  {
    path: "/card",
    name: "card",
    component: MainView,
  },
  {
    path: "/filter",
    name: "filter",
    component: FilterView,
  },
  {
    path: "/add",
    name: "add",
    component: AddTaskView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
