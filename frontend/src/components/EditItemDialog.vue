<template>
  <v-dialog v-model="editItemDialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Edit this Item
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="Description"
                          placeholder="What do you want to do?"
                          :value="updatedItem.description"
                          @change="updatedItem.description = $event"/>
          </v-row>
          <v-row>
            <v-select :items="stateItems.map(obj => obj.name)"
                      label="State"
                      :value="updatedItem.todoStateId"
                      @change="updatedItem.todoStateId = stateItems[$event].id"
                      style="max-width: 150px"
            />
          </v-row>
          <v-row>
            <v-date-picker title="Date Due"
                           @change="updatedItem.dateDue = $event"
                           :value="updatedItem.dateDue"
            />
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" depressed @click="cancelUpdate">Cancel</v-btn>
          <v-btn color="primary" depressed @click="updateItem">Update Item</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditItemDialog",
  // props: ['editItemDialogVisible', 'todoItems', 'stateItems', 'setVisibility', 'item', 'update'],
  props: ['editItemDialogVisible', 'todoItems', 'stateItems', 'setVisibility', 'item'],
  data: () => ({
    updatedItem: {
      id: this.item.id,
      description: this.item.description,
      todoStateId: this.item.todoStateId,
      dateDue: this.item.dateDue,
      ownerUsername: this.item.ownerUsername,
    }
  }),
  methods: {
    updateItem() {
      this.setVisibility(false);
      // this.update(this.updatedItem);
      this.$emit('update', this.updatedItem);
    },
    cancelUpdate() {
      this.setVisibility(false);
    }
  }
}
</script>

<style scoped>

</style>
