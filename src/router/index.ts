import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import ProfileView from "../views/ProfileView.vue";
import FilterView from "../views/FilterView.vue";
import TaskDetailsView from "../views/TaskDetailsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PasswordResetView from "../views/PasswordResetView.vue";
import LoginView from "@/views/LoginView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import { useStore } from "vuex";

const routes: Array<RouteRecordRaw> = [
  // Route definition for root, redirect to /home
  {
    path: "/",
    redirect: "/home",
  },
  // Route for home and card views using MainView component
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
  // Other routes for different views
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
    path: "/editprofile",
    name: "editProfile",
    component: EditProfileView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/password",
    name: "password",
    component: PasswordResetView,
  },
  { path: "/:pathMatch(.*)*", name: "home", component: MainView },
];

// Route creation using router's history and defined routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard: Executed before each route navigation
router.beforeEach((to, from, next) => {
  const store = useStore(); // Accessing Vuex store

  // Handling view types based on route names
  if (to.name === "card") {
    store.state.lastViewType = "card";
  }
  if (to.name === "home") {
    store.state.lastViewType = "list";
  }

  // Setting 'startPageVisited' to true for all routes except 'home'
  if (to.name !== "home") {
    store.state.startPageVisited = true;
  }

  next(); // Continue navigation
});

export default router;
