<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex display-2 font-weight-medium align-center">
        Todo List
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/BYUCS452F2020/todo-list"
        target="_blank"
        text
      >
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
