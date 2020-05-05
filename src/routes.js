import App from "./App.vue"
import LandingPage from "./components/markting/LandingPage.vue"
import About from "./components/markting/About.vue"
import Login from "./components/auth/Login.vue"
import Register from "./components/auth/Register.vue"

const routes = [
  {path: '/',name: 'home', component: LandingPage},
  {path: '/todos', name: 'todos', component: App},
  {path: '/about', name: 'about', component: About},
  {path: '/login', name: 'login', component: Login},
  {path: '/register', name: 'register', component: Register},
]

export default routes
