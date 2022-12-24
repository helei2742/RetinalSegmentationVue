import Vue from 'vue'
import VueRouter from 'vue-router'

const HomePage = () => import('@/views/home/HomePage')

const Login = () => import('@/views/login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
