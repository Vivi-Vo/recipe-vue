import Vue from 'vue'
import app from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(app)
}).$mount('#app')
