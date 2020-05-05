import Vue from 'vue'
import VueRouter from "vue-router"
import Master from "./components/layouts/Master.vue"
import { store } from './store'
import routes from "./routes";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
})

window.eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(Master),
  store,
  router,
}).$mount('#app')
