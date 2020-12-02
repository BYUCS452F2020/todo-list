<template>
  <v-btn color="error"
         @click="deleteTodo">
    Delete
  </v-btn>
</template>

<script>
  export default {
    name: "DeleteTodo",
    props: ['todoId'],
    methods: {
      async deleteTodo() {
        try {
          await this.$axios.delete(`/todos/${this.todoId}`);
          this.$emit("todoDeleted");
        } catch (e) {
          alert("Failed to delete your todo. Please try again later.");
        }
      }
    }
  }
</script>

<style scoped>

</style>
