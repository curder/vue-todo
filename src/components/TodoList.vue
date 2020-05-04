<template>
  <div>
    <input type="text" class="todo-input" v-model="newTodo" @keyup.enter="addTodo" placeholder="What needs to the done" />

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo, index) in todosFilterd" 
            :todo="todo"
            :index="index"
            :checkAll="!anyRemaining"
            :key="todo.id"></todo-item>
    </transition-group>

    <div class="extra-container">
        <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>

        <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
        <todo-filtered :filter="filter"></todo-filtered>
        <div>
            <transition name="fade">
                <todo-clear-completed :show-clear-completed-button="showClearCompletedButton"></todo-clear-completed>
            </transition>
        </div>
    </div>

  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoCheckAll from "./TodoCheckAll.vue";
import TodoItemsRemaining from "./TodoItemsRemaining.vue";
import TodoFiltered from "./TodoFiltered.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";

export default {

  data() {
    return {
        idForTodo: 3,
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
          } else if (this.filter === 'completed') {
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

  created() {
      window.eventBus.$on('removeTodo', (index) => this.removeTodo(index))
      window.eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
      window.eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
      window.eventBus.$on('filterChanged', (filter) => this.filter = filter)
      window.eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
  },


  beforeDestroy() {
    window.eventBus.$off('removeTodo', (index) => this.removeTodo(index))
    window.eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
    window.eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked))
    window.eventBus.$off('filterChanged', (filter) => this.filter = filter)
    window.eventBus.$off('clearCompletedTodos', () => this.clearCompleted())
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

      finishedEdit({index, todo}) {
          // this.todos[index] = todo
          this.todos.splice(index, 1, todo)
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
  },

  components: {
      TodoItem,
      TodoCheckAll,
      TodoItemsRemaining,
      TodoFiltered,
      TodoClearCompleted,
  }
}
</script>
<style lang="scss">
    @import url("https://cdn.bootcdn.net/ajax/libs/animate.css/3.7.2/animate.min.css");

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