<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="loginHandle">

      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="username">Username/Email</label>
        <input type="email" name="username" id="username" class="login-input" v-model="form.username">
        <span v-if="form.errors.has('username')" class="form-error">{{form.errors.first('username')}}</span>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="form.password">
        <span v-if="form.errors.has('password')" class="form-error">{{form.errors.first('password')}}</span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>

    </form>
  </div>
</template>
<script>
import Form from 'form-backend-validation'

export default {
  data() {
    return {
      form: new Form({
        username: '',
        password: '',
      }),
      serverError: '',
    }
  },

  methods: {
    loginHandle() {
      this.$store.dispatch(`retrieveToken`, {
        username: this.form.username,
        password: this.form.password,
      })
        .then(() => {
          this.$router.push({name: 'todos'})
        })
        .catch(err => {
          this.serverError = err.message
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 500px;
  margin: auto;

  .server-error {
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    color: #A94442;
    background: #F3DEDE;
    border-radius: 4px;
  }

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
