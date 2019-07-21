// 这个文件只要来设置路由
// 引入Vue实例和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入所要映射的组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome'
// 使用
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      // 添加路由重定向
      redirect: { name: 'welcome' },

      children: [
        { name: 'welcome',
          path: 'welcome',
          component: Welcome
        }
      ]
    }
  ]
})
export default router
