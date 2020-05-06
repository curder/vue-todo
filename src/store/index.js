import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

axios.defaults.baseURL = "http://laravel-todo.test/api"

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem(`access_token`) || null,
    loading: false,
    todos: [],
    filter: 'all',
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },

    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },

    anyRemaining(state, getters) {
      return getters.remaining !== 0
    },

    todoListFiltered(state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }

      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },

  mutations: {
    clearTodos(state) {
      state.todos = []
    },

    destroyToken(state) {
      state.token = null
    },

    retrieveToken(state, token) {
      state.token = token
    },

    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      })
    },

    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },

    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      })
    },

    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },

    updateFilter(state, filter) {
      state.filter = filter
    },

    checkAll(state, checked) {
      state.todos.forEach(todo => todo.completed = checked)
    },

    retrieveTodos(state, todos) {
      state.todos = todos
    }
  },

  actions: {
    retrieveUserName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            if (response.status === 200) {
              resolve(response)
            }
            reject(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    clearTodos(context) {
      context.commit(`clearTodos`)
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post("/register", data)
          .then(({data}) => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post("/logout")
            .then(({data}) => {
              localStorage.removeItem(`access_token`) // delete to localStorage
              context.commit("destroyToken")
              resolve(data)
            })
            .catch(error => {
              localStorage.removeItem(`access_token`) // delete to localStorage
              context.commit("destroyToken")
              reject(error)
            })
        })
      }
    },

    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post("/login", {
          username: credentials.username,
          password: credentials.password,
        })
          .then(({data}) => {
            if (data.access_token) {
              const token = data.access_token
              localStorage.setItem(`access_token`, token) // save to localStorage
              context.commit("retrieveToken", token)
              resolve(data)
            }
            reject(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // fetch a listing of the resource.
    retrieveTodos(context) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
      context.state.loading = true
      axios.get("/todos")
        .then(({data}) => {
          context.state.loading = false
          context.commit("retrieveTodos", data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Store a newly created resource in storage.
    addTodo(context, todo) {
      axios.post("/todos", todo)
        .then(({data}) => {
          context.commit("addTodo", data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Update the specified resource in storage.
    updateTodo(context, todo) {
      axios.patch(`/todos/${todo.id}`, todo)
        .then(({data}) => {
          context.commit("updateTodo", data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Remove the specified resource from storage.
    deleteTodo(context, id) {
      axios.delete(`/todos/${id}`)
        .then(response => {
          console.log(response)
          context.commit("deleteTodo", id)
        })
        .catch(error => {
          console.log(error)
        })
    },


    clearCompleted(context) {
      // get completed status todo list
      const completed = store.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id)

      axios.delete(`/todos/delete-completed`, {
        data: {
          todos: completed
        }
      })
        .then(() => {
          context.commit("clearCompleted")
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateFilter(context, filter) {
      context.commit("updateFilter", filter)
    },

    checkAll(context, checked) {
      axios.patch(`/todos/check-all`, {
        completed: checked,
      })
        .then(response => {
          console.log(response)
          context.commit("checkAll", checked)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
