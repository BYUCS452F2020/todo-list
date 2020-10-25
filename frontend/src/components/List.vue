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

<!--      <EditItemDialog-->
<!--          v-on:updated="updateItem"-->
<!--          :edit-item-dialog-visible="editItemDialogVisible"-->
<!--          :todo-items="todoItems"-->
<!--          :state-items="currentStates"-->
<!--          :set-visibility="setEditItemVisibility"-->
<!--          :item="itemToEdit"-->
<!--          :update="updateItem"-->
<!--          />-->

    </div>
    <v-card elevation="5">
      <v-row class="text-center">
        <v-col>

        </v-col>
        <v-col>
          <span class="display-3">Todo's</span>
        </v-col>
        <v-col>
          <NewItemDialog
              :state-options="currentStates"
              @todoCreated="todoCreated"
              class="mt-3"
          />
        </v-col>
      </v-row>
      <hr class="mr-12 ml-12"/>
      <v-row justify="center">
        <v-list
            subheader
            flat
        >
          <v-list-item-group multiple>
            <v-list-item v-for="(item, idx) in todoItems" :key="idx">
              <template>
                <v-list-item-action @click="editStateItem(item)">
                  <!--TODO: I would rename currentStates to usersTodoStates-->
                  <v-select :items="currentStates"
                            :label="item.state.name"
                            return-object
                            item-text="name"
                            @change="handleChange($event, item)"
                            style="max-width: 150px"
                  />
                </v-list-item-action>
                <v-list-item-content @click="editTodoItem(item)">
                  <v-list-item-title v-text="item.description"></v-list-item-title>
                  <v-list-item-subtitle>{{item.dateDue}}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import NewItemDialog from "@/components/NewItemDialog";
// import EditItemDialog from "@/components/EditItemDialog";

export default {
  name: "List",
  components: {NewItemDialog},
  data: () => ({
    editStatesDialogVisible: false,
    newItemDialogVisible: false,
    editItemDialogVisible: false,
    itemToEdit: {},
    currentStates: [],
    todoItems: [],
  }),
  created() {
    this.getUsersStates();
    this.getItemsFromUser();
  },
  methods: {
    todoCreated: function(todo) {
      this.todoItems.push(todo);
    },
    handleChange(value, item) {
      item.todoStateId = this.stateItems.filter(item => {return item.name === value})[0].id;
    },
    editStates() {
      this.setEditStatesVisibility(true);
    },
    addTodoItem() {
      this.setNewItemVisibility(true);
    },
    editTodoItem(item) {
      console.log(item);
      this.itemToEdit = item;

    },
    updateItem(item) {
      console.log(item);
    },
    editStateItem(item) {
      // TODO: Handle the dialog for editing states.
      console.log(item);
    },
    async getUsersStates() {
      try {
        let res = await this.$axios.get("/todo-states");
        this.currentStates = res.data.states
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
    }
  }
}
</script>

<style scoped>

</style>
