<template>
  <div>
    <input type="text" class="todo-input" v-model="newTodo" @keyup.enter="addTodo" placeholder="What needs to the done" />

    <div v-for="(todo, index) in todosFilterd" 
        :key="todo.id" 
        class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="todo.completed" />
            <div v-if="!todo.editing" 
                class="todo-item-label"
                :class="{'completed': todo.completed}"
                @dblclick="editTodo(todo)">{{ todo.title }}</div>
            <input v-else 
                v-focus 
                class="todo-item-edit" 
                type="text"
                @blur="doneEdit(todo)"
                @keyup.enter="doneEdit(todo)"
                @keyup.esc="cancelEdit(todo)"
                :tabindex="index"
                v-model="todo.title" />
        </div>
        <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>

    <div class="extra-container">
        <div>
            <label><input type="checkbox" 
                    @click="checkAllTodos"
                    :checked="!anyRemaining">Check All</label>
        </div>
        <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
        <div>
            <button :class="{'active': filter === 'all'}" @click="filter = 'all'">All</button>
            <button :class="{'active': filter === 'active'}" @click="filter = 'active'">Active</button>
            <button :class="{'active': filter === 'completed'}" @click="filter = 'completed'">Completed</button>
        </div>
        <div>
            <transition name="fade">
                <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
            </transition>
        </div>
    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
        idForTodo: 3,
        beforeEditCache: '',
        todos: [
            {id: 1, title: "Learn go lang", editing: false, completed: false},
            {id: 2, title: "Finish vue screencast", editing: false, completed: false}
        ],
        newTodo: '',
        filter: 'all',
    }
  },
  computed: {
      remaining() {
        return this.todos.filter(todo => !todo.completed).length
      },
      anyRemaining() {
          return this.remaining !== 0
      },
      todosFilterd() {
          if (this.filter === 'all') {
              return this.todos
          } else if (this.filter === 'active') {
              return this.todos.filter(todo => !todo.completed)
          } else if (this.fitler === 'completed') {
              return this.todos.filter(todo => todo.completed)
          }

          return this.todos;
      },
      showClearCompletedButton() {
          return this.todos.filter(todo => todo.completed).length > 0
      }
  },
  directives: {
      focus: {
          inserted(el) {
              el.focus()
          }
      }
  },

  methods: {
      addTodo() {
          if (this.newTodo.trim().length === 0) {
            return
          }

          this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
          })
          this.newTodo = ''
          this.idForTodo++
      },
      editTodo(todo) {
          this.beforeEditCache = todo.title
          todo.editing = true
      },
      doneEdit(todo) {
          if (todo.title.trim() === '') {
            todo.title = this.beforeEditCache
          }
          todo.editing = false
      },
      cancelEdit(todo) {
          console.log(todo)
          todo.title = this.beforeEditCache
          todo.editing = false
      },
      removeTodo(index) {
          this.todos.splice(index, 1)
      },
      checkAllTodos() {
          this.todos.forEach(todo => todo.completed = event.target.checked)
      },
      clearCompleted() {
          this.todos = this.todos.filter(todo => !todo.completed)
      }
  }
}
</script>
<style lang="scss">
    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
        &:focus {
        outline: 0;
        }
    }
    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;

        .todo-item-left { // later
            display: flex;
            align-items: center;
        }
        .todo-item-label {
            padding: 10px;
            border: 1px solid white;
            margin-left: 12px;
            &.completed {
                text-decoration: line-through;
                color: grey;
            }
        }
        
        .todo-item-edit {
            font-size: 24px;
            color: #2c3e50;
            margin-left: 12px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc; //override defaults
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            &:focus {
            outline: none;
            }
        }

        .remove-item {
            cursor: pointer;
            margin-left: 14px;
            &:hover {
            color: black;
            }
        }
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }
    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        &:hover {
            background: lightgreen;
        }
        &:focus {
            outline: none;
        }
        &.active {
            background: lightgreen;
        }
    }
    // CSS Transitions
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>