<template>
  <div class="register-form">
    <h2 class="register-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <div class="form-control">
        <label for="username">Name</label>
        <input type="text" name="username" id="username" class="register-input" v-model="username">
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="register-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="register-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },

  methods: {
    register() {
      this.$store.dispatch(`register`, {
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push({name: 'login'})
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.register-form {
  max-width: 500px;
  margin: auto;

  .register-heading {
    margin-bottom: 16px;
  }

  .form-control {
    margin-bottom: 24px;
  }

  .register-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
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
}


</style>
