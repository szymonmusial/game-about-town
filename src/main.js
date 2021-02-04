import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.$cookies.config('30d')
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
