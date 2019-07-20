// 这个文件只要来设置路由
// 引入Vue实例和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入所要映射的组件
import Login from '@/views/login.vue'
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
    }
  ]
})
export default router
