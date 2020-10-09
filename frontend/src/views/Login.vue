<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
              color="primary"
              dark
              flat
          >
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Username"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
              ></v-text-field>

              <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  @keyup.enter="login"
                  v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>

              <router-link to="signup">
                <div class="pl-3">
                  Don't have an account?
                </div>
              </router-link>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   class="pr-3"
                   @click="login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Login",
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
      login: async function () {
        if (!this.username || !this.password) {
          alert('Sorry, but a username and password are required to login. Please fill both out then try again.');
          return;
        }

        try {
          let res = await this.$axios.post('/user/login', {
            username: this.username,
            password: this.password
          });
          this.$root.user = res.data.user;
          await this.$router.push('/')
        } catch (e) {
          if (e.response.status === 401){
            alert("Error incorrect username password combination");
          } else {
            alert("Internal error, please try again.");
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
