<template>
  <div>
    <v-btn
           depressed
           color="primary"
           @click="toggleShow"
    >
      Add Todo Item <v-icon dense>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="shown"
              max-width="600px">
      <v-card>
        <v-card-title>
          Create A New Item
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Description"
                            placeholder="What do you want to do?"
                            v-model="newTodo.description"/>
              <v-select :items="stateOptions"
                        label="State"
                        item-text="name"
                        return-object
                        v-model="newTodo.state"
                        style="max-width: 150px"
                        class="pl-3"
              />
            </v-row>
            <v-row justify="center">
              <v-col/>
              <v-col class="text-center">
                <span class="headline">Due Date</span>
                <v-date-picker
                    v-model="newTodo.dateDue"
                />
              </v-col>
              <v-col/>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" depressed @click="cancelItem">Cancel</v-btn>
            <v-btn color="primary" depressed @click="createTodo">Add Item</v-btn>
            <v-spacer/>
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
    newTodo: {
      description: "",
      dateDue: "",
      state: {
        _id: -1,
        name: ""
      },
    },
  }),
  methods: {
    toggleShow() {
      this.shown = true;
    },
    createTodo: async function () {
      try {
        await this.$axios.post('/todos');
        this.shown = false; // Dismiss dialog.
        this.$emit('todoCreated'); // Pass created _todo to parent.
        this.resetNewTodo();
      } catch (e) {
        console.log(e);
        alert("Sorry there was an error saving your new todo.")
      }
    },
    cancelItem() {
      this.clearItem();
      this.shown = false;
    },
    clearItem() {
      this.resetNewTodo()
    },
    resetNewTodo() {
      this.newTodo = {
        description: "",
        todoStateId: 0,
        dateDue: "",
        ownerUsername: "",
      }
    }
  },
}
</script>

<style scoped>

</style>
