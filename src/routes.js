import App from "./App.vue"
import LandingPage from "./components/markting/LandingPage.vue"
import About from "./components/markting/About.vue"
import Login from "./components/auth/Login.vue"
import Logout from "./components/auth/Logout.vue"
import Register from "./components/auth/Register.vue"

const routes = [
  {path: '/', name: 'home', component: LandingPage},
  {path: '/todos', name: 'todos', component: App, meta: {requiresAuth: true}},
  {path: '/about', name: 'about', component: About},
  {path: '/login', name: 'login', component: Login, meta: {requiresVisitor: true}},
  {path: '/logout', name: 'logout', component: Logout},
  {path: '/register', name: 'register', component: Register, meta: {requiresVisitor: true}},
]

export default routes
