import Vue from 'vue'
import App from './App.vue'
Vue.component('login', require('./components/login.vue'))

new Vue({
  el: '#app',
  render: h => h(App)
})
