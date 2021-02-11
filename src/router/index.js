import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import Login from '../views/backend/Login.vue'
import Backend from '../views/backend/Backend.vue'
import Details from '../views/backend/Details.vue'
import NewQuestion from '../views/backend/NewQuestion.vue'
import NotFound from '../views/NotFound.vue'
import { projectAuth } from '../firebase/config'

// Auth Guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ' + user)

  !user ? next({ name: 'Login' }) : next()
}

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
    beforeEnter: requireAuth
  },
  {
    path: '/backend/:id',
    name: 'Details',
    component: Details,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/backend/ajouter',
    name: 'NewQuestion',
    component: NewQuestion,
    beforeEnter: requireAuth
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
