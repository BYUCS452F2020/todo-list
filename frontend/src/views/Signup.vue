<template>
  <v-container
    class="fill-height"
    fluid>
    <v-row
        justify="center"
        align="center">
      <v-col
          md="4"
          sm="8"
          cols="12">
        <v-card class="elevation-12">
          <v-toolbar
              color="primary"
              dark
              flat
          >
            <v-toolbar-title>Sign Up</v-toolbar-title>
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
                  @keyup.enter="signup"
                  v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <router-link to="login">
              <div class="pl-3">
                Already have an account?
              </div>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   class="pr-3"
                   @click="signup">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Signup",
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
      signup: function () {
        if (!this.username || !this.password) {
          alert('Sorry, but a username and password are required to sign up. Please fill both out then try again.');
          return;
        }

        alert('signed up')
      }
    }
  }
</script>

<style scoped>

</style>
