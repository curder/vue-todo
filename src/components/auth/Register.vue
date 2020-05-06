<template>
  <div class="register-form">
    <h2 class="register-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <div v-if="serverErrors" class="server-error">
        <div v-for="(value, key) in serverErrors" :key="key">{{ value[0] }}</div>
      </div>

      <div class="form-control">
        <label for="username">Name</label>
        <input type="text" name="username" id="username" class="register-input" v-model="form.username">
        <span v-if="form.errors.has('username')" class="form-error">{{form.errors.first('username')}}</span>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="register-input" v-model="form.email">
        <span v-if="form.errors.has('email')" class="form-error">{{form.errors.first('email')}}</span>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="register-input" v-model="form.password">
        <span v-if="form.errors.has('password')" class="form-error">{{form.errors.first('password')}}</span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>
    </form>
  </div>
</template>
<script>
import Form from 'form-backend-validation';

export default {
  data() {
    return {
      form: new Form({
        username: '',
        email: '',
        password: '',
      }),
      serverErrors: '',
    };
  },

  methods: {
    register() {
      this.$store.dispatch(`register`, {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
      })
        .then(() => {
          this.$router.push({name: 'login'})
        })
        .catch(err => {
          const errors = err.response.data.errors
          this.form.withErrors(errors)
          this.serverErrors = Object.values(errors)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.register-form {
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

  .form-error {
    font-size: 16px;
    color: #A94442;
  }

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
