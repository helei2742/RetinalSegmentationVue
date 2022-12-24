import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入elementUI
import ElementUI from 'element-ui';
//引入样式
import 'element-ui/lib/theme-chalk/index.css';
//全局引用
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

