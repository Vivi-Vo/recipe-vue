import Vue from 'vue'
// import app from './App.vue'
import home from './components/Home.vue'
import vuetify from './plugins/vuetify';
import router from './router'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(home)
}).$mount('#home')
