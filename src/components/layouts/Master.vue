<template>
  <div id="app">
    <ul class="nav">
      <li class="todo-logo">
        <router-link :to="{name: 'todos'}">Todo</router-link>
      </li>
      <li>
        <router-link :to="{name: 'home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{name: 'about'}">About</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{name: 'register'}">Register</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{name: 'login'}">Login</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{name: 'logout'}">Logout</router-link>
      </li>
    </ul>
    <router-view></router-view>

  </div>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  padding: 15px 0;
  background: #F5F8FA;
  border-bottom: 1px solid lightgrey;
  margin: 0 0 24px;

  .todo-logo {
    flex-grow: 1;
    margin-left: 25px;

    a {
      font-size: 18px;
    }
  }

  a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
