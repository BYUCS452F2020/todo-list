<template>
  <div style="padding: 40px">
    <div>
      <!--TODO: refactor this dialog into its own component-->
      <v-btn style="margin: 10px" depressed color="primary" @click="editStates">Edit States</v-btn>

      <v-dialog v-model="addItemDialog" persistent max-width="600px">
        <template v-slot:activator="{on, newItem}">
          <v-btn style="margin: 10px; float: right"
                 depressed
                 color="primary"
                 v-on="on"
                 v-bind="newItem"
          >Add Item Todo</v-btn>
        </template>
        <v-card>
          <v-card-title>
            Create A New Item
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field label="Description"
                              placeholder="What do you want to do?"
                              @change="newItem.description = $event"/>
              </v-row>
              <v-row>
                <v-select :items="stateItems"
                          label="State"
                          @change="newItem.todoStateId = stateItems[$event].id"
                          style="max-width: 150px"
                />
              </v-row>
              <v-row>
                <v-date-picker title="Date Due"
                               @change="newItem.dateDue = $event"
                               v-bind:value="newItem.dateDue"
                />
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="primary" depressed @click="cancelItem">Cancel</v-btn>
              <v-btn color="primary" depressed @click="addItem">Add Item</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>

    </div>
    <v-list
        subheader
        flat
    >
      <v-list-item-group multiple>
        <v-list-item v-for="(item, idx) in todoItems" :key="idx">
          <template>
            <v-list-item-action @click="editItem(item)">
              <v-select :items="currentStates"
                        :value="currentStates[item.todoStateId]"
                        label="State"
                        @change="handleChange($event, item)"
                        style="max-width: 150px"
              />
            </v-list-item-action>
            <v-list-item-content>
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
export default {
  name: "List",
  data: () => ({
    addItemDialog: false,
    editStatesDialog: false,
    newItem: {
      id: -1,
      description: "",
      todoStateId: 0,
      dateDue: "",
      ownerUsername: "",
    },
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
    handleChange(value, item) {
      item.todoStateId = this.stateItems[value].id;
      // TODO: Update the changes made to the item. If completed, do we want to actually delete it? Or wait?
    },
    editStates() {

    },
    addItem() {
      this.addItemDialog = false;
      this.todoItems.push(this.newItem);
      // TODO: Add newItem to the DB
      this.clearNewItem();
    },
    editItem(item) {
      // TODO: Handle the dialog for editing states.
      console.log(item);
    },
    cancelItem() {
      this.clearNewItem();
      this.addItemDialog = false;
    },
    clearNewItem() {
      this.newItem = {
        id: -1,
        description: "",
        todoStateId: 0,
        dateDue: "",
        ownerUsername: "",
      }
    },
    fillCurrentStates() {
      this.currentStates = [];
      this.stateItems.forEach((item) => {
        this.currentStates[item.id] = item.name;
      });
      console.log(this.currentStates);
    }
  }
}
</script>

<style scoped>

</style>