<template>
  <div style="padding: 40px">
    <v-row>
      <span class="display-1">Todos</span>
      <v-spacer/>
      <EditStatesDialog :state-options="usersTodoStates"
                        :todo-list="todoItems"
                        @stateCreated="todoStateCreated"
                        @stateDeleted="todoStateDeleted"
      />
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
          <DeleteTodo :todo-id="todo._id"
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
import EditStatesDialog from "./EditStatesDialog";
import moment from 'moment';
import DeleteTodo from "./DeleteTodo";

export default {
  name: "List",
  components: {DeleteTodo, EditItemDialog, NewItemDialog, EditStatesDialog},
  data: () => ({
    usersTodoStates: [],
    todoItems: [],
  }),
  created() {
    this.getUsersStates();
    this.getItemsFromUser();
  },
  methods: {
    todoCreated: function() {
      //this.todoItems.unshift(todo);
      this.getItemsFromUser();
    },
    todoUpdated(){
      // this.todoItems = this.todoItems.filter(el => {
      //   if (el._id === todo._id) {
      //     return todo
      //   }
      //   return el
      // });
      this.getItemsFromUser();
    },
    todoDeleted: function() {
      //this.todoItems = this.todoItems.filter(el => { return el._id !== todoId });
      this.getItemsFromUser();
    },
    todoStateCreated() {
      //this.usersTodoStates.push(state);
      this.getUsersStates();
    },
    todoStateDeleted() {
      //this.usersTodoStates = this.usersTodoStates.filter(el => {return el._id !== stateId});
      this.getUsersStates();
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
      return moment(date).format('MM - DD - YYYY')
    }
  }
}
</script>

<style scoped>

</style>
