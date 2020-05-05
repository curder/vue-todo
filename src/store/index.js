import Vue from "vue"
import Vuex from "vuex"
import db from "../firebase";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    todos: [],
    filter: 'all',
    loading: true,
  },

  getters: {
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
    retrieveTodos(state, todos) {
      state.todos = todos
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
      if (index >= 0) {
        state.todos.splice(index, 1)
      }
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
    }
  },

  actions: {
    initRealtimeListeners(context) {
      db.collection(`todos`).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const [id, title, completed] = [change.doc.id, change.doc.data().title, change.doc.data().completed];
          if (change.type === 'added') {
            const source = snapshot.metadata.hasPendingWrites ? 'Local' : 'Server'

            if (source === "Server") {
              context.commit(`addTodo`, {
                id, title, completed: false,
              })
            }
          }

          if (change.type === 'modified') {
            context.commit('updateTodo', {
              id, title, completed,
            })
          }

          if (change.type === 'removed') {
            context.commit(`deleteTodo`, id)
          }

        })
      })
    },

    retrieveTodos(context) {
      context.state.loading = true
      db.collection(`todos`).get()
        .then(querySnapshot => {
          let tempTodos = []
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
              created_at: doc.data().created_at,
            }
            tempTodos.push(data)
          })
          const tempTodosSorted = tempTodos.sort((a, b) => {
            return a.created_at.seconds - b.created_at.seconds
          })
          context.commit(`retrieveTodos`, tempTodosSorted)
          context.state.loading = false
        })
    }
    ,

    addTodo(context, todo) {
      db.collection(`todos`).add({
        title: todo.title,
        completed: false,
        created_at: new Date(),
      })
        .then(docRef => {
          context.commit("addTodo", {
            id: docRef.id,
            title: todo.title,
            completed: false,
          })
        })
    }
    ,

    deleteTodo(context, id) {
      db.collection(`todos`).doc(id).delete()
        .then(() => {
          context.commit("deleteTodo", id)
        })
    }
    ,

    updateTodo(context, todo) {
      db.collection(`todos`).doc(todo.id).set({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        // created_at: new Date(),
      }, {merge: true}).then(() => {
        context.commit("updateTodo", todo)
      })
    }
    ,

    clearCompleted(context) {
      db.collection(`todos`).where('completed', '==', true).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
              .then(() => {
                context.commit("clearCompleted")
              })
          })
        })
    }
    ,

    updateFilter(context, filter) {
      context.commit("updateFilter", filter)
    }
    ,

    checkAll(context, checked) {
      db.collection(`todos`).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              completed: checked
            }).then(() => {
              context.commit("checkAll", checked)
            })
          })
        })
    }
    ,

  },

})
