<template>
  <v-dialog v-model="newItemDialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Create A New Item
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="Description"
                          placeholder="What do you want to do?"
                          @change="item.description = $event"/>
          </v-row>
          <v-row>
            <v-select :items="stateItems.map(obj => obj.name)"
                      label="State"
                      @change="item.todoStateId = stateItems[$event].id"
                      style="max-width: 150px"
            />
          </v-row>
          <v-row>
            <v-date-picker title="Date Due"
                           @change="item.dateDue = $event"
                           v-bind:value="item.dateDue"
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
</template>

<script>
export default {
  name: "NewItemDialog",
  props: ['newItemDialogVisible', 'todoItems', 'stateItems', "setVisibility"],
  data: () => ({
    item: {
      id: -1,
      description: "",
      todoStateId: 0,
      dateDue: "",
      ownerUsername: "",
    },
  }),
  methods: {
    addItem() {
      this.setVisibility(false);
      this.todoItems.push(this.item);
      // TODO: Add item to the DB
      this.clearItem();
    },
    cancelItem() {
      this.clearItem();
      this.setVisibility(false);
    },
    clearItem() {
      this.item = {
        id: -1,
        description: "",
        todoStateId: 0,
        dateDue: "",
        ownerUsername: "",
      }
    },
  },
}
</script>

<style scoped>

</style>