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
      <NewItemDialog
          :state-options="currentStates"
          @todoCreated="todoCreated"
      />
      <EditItemDialog
          v-on:updated="updateItem"
          :edit-item-dialog-visible="editItemDialogVisible"
          :todo-items="todoItems"
          :state-items="currentStates"
          :set-visibility="setEditItemVisibility"
          :item="itemToEdit"
          :update="updateItem"
          />

    </div>
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
  </div>
</template>

<script>
import NewItemDialog from "@/components/NewItemDialog";
import EditItemDialog from "@/components/EditItemDialog";

export default {
  name: "List",
  components: {EditItemDialog, NewItemDialog},
  data: () => ({
    editStatesDialogVisible: false,
    newItemDialogVisible: false,
    editItemDialogVisible: false,
    itemToEdit: {},
    currentStates: [],
    todoItems: [],
  }),
  created() {
    this.fillCurrentStates();
    this.getItemsFromUser();
  },
  methods: {
    todoCreated: function(item) {
      this.todoItems.push(item);
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
    fillCurrentStates() {
      try {
        this.currentStates = this.$axios.get("/todo-states/", {
          ownerUsername: this.$root.user
        });
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
