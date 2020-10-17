<template>
  <div style="padding: 40px">
    <div>
      <!--TODO: refactor this dialog into its own component-->
      <v-btn style="margin: 10px"
             depressed
             color="primary"
             @click="editStates"
      >Edit States</v-btn>
      <EditStatesDialog
          :edit-states-dialog-visible="editStatesDialogVisible"
          :state-items="currentStates"
          :set-dialog-visibility="setEditStatesVisibility"
      />
      <v-btn style="margin: 10px; float: right"
             depressed
             color="primary"
             @click="addTodoItem"
      >Add Item Todo</v-btn>
      <NewItemDialog
          :new-item-dialog-visible="newItemDialogVisible"
          :todo-items="todoItems"
          :state-items="currentStates"
          :set-visibility="setNewItemVisibility"
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
              <v-select :items="currentStates"
                        :value="currentStates[item.todoStateId]"
                        label="State"
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
import EditStatesDialog from "@/components/EditStatesDialog";

export default {
  name: "List",
  components: {EditStatesDialog, EditItemDialog, NewItemDialog},
  data: () => ({
    editStatesDialogVisible: false,
    newItemDialogVisible: false,
    editItemDialogVisible: false,
    itemToEdit: {},
    currentStates: [],
    // This is dummy data for UI testing TODO: Remove the dummy data and use api to populate todoItems
    //Probably will use moment for timeDue
    todoItems: [
      {
        id: 1,
        description: "Tell Carson he is a total git",
        todoStateId: 3,
        dateDue: "9/13/20",
        ownerUsername: "logiBear"
      },
      {
        id: 2,
        description: "Crush Carson at some game",
        todoStateId: 0,
        dateDue: "9/17/20",
        ownerUsername: "logiBear"
      },
      {
        id: 3,
        description: "Each lunch with Megan",
        todoStateId: 0,
        dateDue: "9/18/20",
        ownerUsername: "logiBear"
      },
      {
        id: 4,
        description: "Finish building Todo-List project",
        todoStateId: 2,
        dateDue: "9/30/20",
        ownerUsername: "logiBear"
      },
      {
        id: 5,
        description: "Talk to Mimi about what it's like being married to a git like Carson",
        todoStateId: 0,
        dateDue: "10/10/20",
        ownerUsername: "logiBear"
      }
    ],
    stateItems: [
      {
        id: 0,
        name: "new",
        ownerUsername: "logiBear"
      },
      {
        id: 1,
        name: "complete",
        ownerUsername: "logiBear"
      },
      {
        id: 2,
        name: "in progress",
        ownerUsername: "logiBear"
      },
      {
        id: 3,
        name: "past due",
        ownerUsername: "logiBear"
      },
    ]
  }),
  mounted() {
    this.fillCurrentStates();
  },
  methods: {
    setNewItemVisibility(show) {
      this.newItemDialogVisible = show;
    },
    setEditItemVisibility(show) {
      this.editItemDialogVisible = show;
    },
    setEditStatesVisibility(show) {
      this.editStatesDialogVisible = show;
    },
    handleChange(value, item) {
      console.log("val : " + value);
      console.log(item);
      console.log(this.stateItems.filter(item => {return item.name === value})[0].id);
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
      this.currentStates = [];
      // this.$root.user // most likely
      // this.$router.user
      // this.$root.data.user
      /*this.stateItems.forEach((item) => {
        this.currentStates[item.id] = item.name;
      });*/
      try {
        this.currentStates = this.$axios.get("/todo-states/", {
          ownerUsername: "logiBear" //TODO: Actually get the current user's username
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
