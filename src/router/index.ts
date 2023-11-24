import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import ProfileView from "../views/ProfileView.vue";
import FilterView from "../views/FilterView.vue";
import TaskDetailsView from "../views/TaskDetailsView.vue";
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
    component: TaskDetailsView,
  },
  {
    path: "/edit/task/:id",
    name: "edit",
    component: TaskDetailsView,
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
  { path: '/:pathMatch(.*)*', name: 'home', component: MainView },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
