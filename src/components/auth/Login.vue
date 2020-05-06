<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="loginHandle">

      <div class="form-control">
        <label for="username">Username/Email</label>
        <input type="email" name="username" id="username" class="login-input" v-model="username">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>

    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    loginHandle() {
      this.$store.dispatch(`retrieveToken`, {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.$router.push({name: 'todos'})
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 500px;
  margin: auto;

  .login-heading {
    margin-bottom: 16px;
  }

  .form-control {
    margin-bottom: 24px;
  }

  .login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
  }
}

.btn-submit {
  width: 100%;
  padding: 14px 12px;
  font-size: 18px;
  font-weight: bold;
  background: #60BD4F;
  color: white;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: darken(#60BD4F, 10%);
  }
}
</style>
