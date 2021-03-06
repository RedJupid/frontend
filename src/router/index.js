import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('../views/login/Login.vue')
const About = () => import('../views/About.vue')
const User = () => import('../views/system/User.vue')
const Role = () => import('../views/system/Role.vue')
const Menu = () => import('../views/system/Menu.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/user',
        name: 'user',
        component: User
      },{
        path: '/role',
        name: 'role',
        component: Role
      },{
        path: '/menu',
        name: 'menu',
        component: Menu
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //没有登录时返回登录页面
  if (localStorage.getItem("loginInfo")==null && to.name !=='login'){
    next({ name: 'login' })
  }else{
    next()
  }
})

export default router
