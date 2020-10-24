<template>
  <div>
    <v-btn
           depressed
           color="primary"
           @click="toggleShow"
    >
      Add Item Todo
    </v-btn>
    <v-dialog v-model="shown" persistent max-width="600px">
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
<!--              <v-select :items="stateOptions.map(obj => obj.name)"-->
<!--                        label="State"-->
<!--                        @change="item.todoStateId = stateOptions[$event].id"-->
<!--                        style="max-width: 150px"-->
<!--              />-->
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
            <v-btn color="primary" depressed @click="createTodo">Add Item</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "NewItemDialog",
  props: ['stateOptions'],
  data: () => ({
    shown: false,
    item: {
      id: -1,
      description: "",
      dateDue: "",
      state: {
        id: -1,
        name: ""
      },
    },
  }),
  methods: {
    toggleShow: function() {
      this.shown = true
    },
    createTodo() {
      // TODO: Call API to save todo
      // TODO: Set visibility
      // TODO: Emit itemCreated event to parent
    },
    cancelItem() {
      this.clearItem();
      this.shown = false;
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
