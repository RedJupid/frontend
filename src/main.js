import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.axios = axios
Vue.prototype.qs = qs

Vue.use(Antd);
axios.defaults.baseURL = '/api/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
