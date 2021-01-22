import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import Backend from '../views/backend/Backend.vue'
import Details from '../views/backend/Details.vue'
import NotFound from '../views/NotFound.vue'

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
  },
  {
    path: '/backend/:id',
    name: 'Details',
    component: Details,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
