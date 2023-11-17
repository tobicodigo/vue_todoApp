import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainView from '../views/MainView.vue'
import ProfileView from '../views/ProfileView.vue'
import FilterView from '../views/FilterView.vue'
import AddTaskView from '../views/AddTaskView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: MainView
  },
  {
    path: '/filter',
    name: 'Filter',
    component: FilterView
  },
  {
    path: '/add',
    name: 'Add',
    component: AddTaskView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
