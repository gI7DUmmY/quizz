import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import Backend from '../views/Backend.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/qcm',
    name: 'Questions',
    component: Questions,
    props: true
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
