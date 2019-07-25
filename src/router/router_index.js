// 这个文件只要来设置路由
// 引入Vue实例和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入所要映射的组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome'
import User from '@/views/users/users.vue'
import Roles from '@/views/role/roles.vue'
import Rrights from '@/views/role/rights.vue'
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
        },
        { name: 'users',
          path: 'users',
          component: User
        },
        { name: 'roles',
          path: 'roles',
          component: Roles
        },
        { name: 'rights',
          path: 'rights',
          component: Rrights
        }
      ]
    }
  ]
})
export default router
