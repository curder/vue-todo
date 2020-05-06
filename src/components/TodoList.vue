<template>
  <div>
    <div class="username-container">Welcome，{{ username }}</div>
    <input type="text" class="todo-input" v-model="newTodo" @keyup.enter="addTodo"
           placeholder="What needs to the done"/>

    <Loading v-if="$store.state.loading"/>

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="(todo, index) in todoListFiltered"
                 :todo="todo"
                 :index="index"
                 :checkAll="!anyRemaining"
                 :key="todo.id"></todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all></todo-check-all>

      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filtered></todo-filtered>
      <div>
        <transition name="fade">
          <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import Loading from './Loading.vue';
import TodoItem from './TodoItem.vue';
import TodoCheckAll from "./TodoCheckAll.vue";
import TodoItemsRemaining from "./TodoItemsRemaining.vue";
import TodoFiltered from "./TodoFiltered.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";

export default {

  data() {
    return {
      username: `test`,
      idForTodo: 3,
      newTodo: '',
    }
  },

  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todoListFiltered() {
      return this.$store.getters.todoListFiltered
    },
  },

  created() {
    this.$store.dispatch(`retrieveTodos`)
    this.$store.dispatch(`retrieveUserName`)
      .then(({data}) => {
        this.username = data.name
      })
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

      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
  },

  components: {
    Loading,
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

.username-container {
  margin-bottom: 16px;
}

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
  padding: 2px 6px;

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
