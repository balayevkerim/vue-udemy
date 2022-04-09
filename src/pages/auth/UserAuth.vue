<template>
<base-dialog :show="!!error" title="Auth Error" @close="closeDialog">
      <base-spinner v-if="isLoading"></base-spinner>
  <p>{{error}}</p>
</base-dialog>
<base-dialog fixed :show="isLoading" title="Authentication">
      <base-spinner v-if="isLoading"></base-spinner>
  <p>Signing in...</p>
</base-dialog>

  <base-card>
    <form @submit.prevent="submitRequest">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid">Fill Required fields!</p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" @click="signUpSwitch" mode="outline">{{
        signUpCaption
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      authMode: 'login',
      isLoading:false,
      error:null
    };
  },
  methods: {
    closeDialog(){
      this.error=null
    },
    async submitRequest() {
      let url =  this.$route.query.redirect || 'coaches';
      url = '/'+url

console.log(url)
      this.formIsValid = true;
      if (this.email == '' || this.password == '') {
        this.formIsValid = false;
      }
      if (!this.formIsValid) {
        return;
      }

      this.isLoading=true
      try {
         if (this.authMode == 'login') {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
      } else {
        await this.$store.dispatch('signUp', {
          email: this.email,
          password: this.password,
        });
      }
      this.isLoading=false
      this.$router.replace(url)
      } catch (error) {
        console.log('error happened')
        this.isLoading=false
          this.error =error.message || 'Something went wrong'
      }
     
    },
    signUpSwitch() {
      if (this.authMode == 'login') {
        this.authMode = 'signup';
      } else {
        this.authMode = 'login';
      }
    },
  },
  computed: {
    submitButtonCaption() {
      if (this.authMode == 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },
    signUpCaption() {
      if (this.authMode == 'login') {
        return 'Sign Up Instead';
      } else {
        return 'Login INstead';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>