<template>
  <div style="padding: 40px">
    <div>
      <!--TODO: refactor this dialog into its own component-->
<!--      <v-btn style="margin: 10px"-->
<!--             depressed-->
<!--             color="primary"-->
<!--             @click="editStates"-->
<!--      >Edit States</v-btn>-->
      <!--<EditStatesDialog
          :edit-states-dialog-visible="editStatesDialogVisible"
          :state-items="currentStates"
          :set-dialog-visibility="setEditStatesVisibility"
      />-->

    </div>
    <v-row>
      <span class="display-1">Todos</span>
      <v-spacer/>
      <NewItemDialog :stateOptions="usersTodoStates"
                     @todoCreated="todoCreated"/>
    </v-row>
    <v-simple-table>
      <thead>
        <tr>
          <th>State</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todoItems"
          :key="index">
        <td>{{todo.state.name}}</td>
        <td>{{todo.description}}</td>
        <td>{{formatDate(todo.dateDue)}}</td>
        <td>
          <EditItemDialog :item="todo"
                          :state-options="usersTodoStates"
                          @itemUpdated="todoUpdated"/>
        </td>
        <td>
          <DeleteTodo :todo-id="todo.id"
                      @todoDeleted="todoDeleted"/>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import NewItemDialog from "@/components/NewItemDialog";
import EditItemDialog from "./EditItemDialog";
import moment from 'moment';
import DeleteTodo from "./DeleteTodo";

export default {
  name: "List",
  components: {DeleteTodo, EditItemDialog, NewItemDialog},
  data: () => ({
    usersTodoStates: [],
    todoItems: [],
  }),
  created() {
    this.getUsersStates();
    this.getItemsFromUser();
  },
  methods: {
    todoCreated: function(todo) {
      this.todoItems.unshift(todo);
    },
    todoUpdated(todo){
      this.todoItems = this.todoItems.filter(el => {
        if (el.id === todo.id) {
          return todo
        }
        return el
      })
    },
    todoDeleted: function(todoId) {
      this.todoItems = this.todoItems.filter(el => { return el.id !== todoId })
    },
    async getUsersStates() {
      try {
        let res = await this.$axios.get("/todo-states");
        this.usersTodoStates = res.data.states
      } catch (e) {
        console.log(e);
      }
    },
    async getItemsFromUser() {
      try {
        let res = await this.$axios.get("/todos");
        this.todoItems = res.data.todos;
      } catch(e) {
        console.log(e);
      }
    },
    formatDate(date) {
      return moment(date).format('MM DD, YYYY')
    }
  }
}
</script>

<style scoped>

</style>
