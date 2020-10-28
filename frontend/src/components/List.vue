<template>
  <div style="padding: 40px">
    <v-row>
      <span class="display-1">Todos</span>
      <v-spacer/>
      <EditStatesDialog :stateOptions="usersTodoStates"
                        @stateUpdated="todoStateUpdated"
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

export default {
  name: "List",
  components: {EditItemDialog, NewItemDialog, EditStatesDialog},
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
      this.todoItems = this.todoItems.map(el => {
        if (el.id === todo.id) {
          return todo
        }
        return el
      })
    },
    todoStateUpdated(state) {
      //TODO: implement this!!!
      console.log(state);
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
