import Vue from 'vue'
import VueRouter from 'vue-router'

const HomePage = () => import('@/views/home/HomePage')
const TempPate = () => import('@/views/temp/TempPage')
const UserUploadPage = () => import('@/views/user/UserUploadPage')
const PatientPage = () => import('@/views/user/PatientPage')
const UserPage = () => import('@/views/user/UserPage')

const CreateAccount = () => import('@/views/CreateAccount')
const Login = () => import('@/views/login')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/temp',
    name: 'temp',
    component: TempPate
  },
  {
    path: '/createAccount',
    name: 'createAccount',
    component: CreateAccount
  },
  {
    path: '/userUpload',
    name: 'userUpload',
    component: UserUploadPage
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage
  },
  { path: '/patientPage',
    name: 'patient',
    component: PatientPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
