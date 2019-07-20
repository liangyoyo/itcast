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
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
