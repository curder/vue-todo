import Vue from 'vue'
import VueRouter from "vue-router"
import Master from "./components/layouts/Master.vue"
import { store } from './store'
import routes from "./routes"

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'todos',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

window.eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(Master),
  store,
  router,
}).$mount('#app')
