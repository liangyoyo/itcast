import Vue from 'vue'
import App from './App.vue'
// 引入 element-ui
import ElementUI from 'element-ui'
// 引入 element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import '@/styles/index.less'
// 引入路由文件
import router from '@/router/router_index.js'
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否登录过或者跳转到login页面，如果是，继续
  var token = localStorage.getItem('itcast_token')
  if (token || to.path === '/login') {
    next()
  } else {
    // 否则即重定向到登陆页
    next({ name: 'login' })
  }
})
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
