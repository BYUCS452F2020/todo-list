<template>
  <div>
    <v-btn
      depressed
      color="primary"
      @click="toggleShown"
      style="margin-right: 15px;"
    >
      Edit States <v-icon dense>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="shown" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Edit Your States
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(state, index) in stateOptions"
                    :key="index">
                    <td>{{state.name}}</td>
                    <td v-if="state.owner_username !== null">
                      <v-btn
                          color="error"
                          @click="deleteState(state)"
                          small>
                        Delete
                      </v-btn>
                    </td>
                    <td v-else></td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-row style="margin-top: 15px;">
              <v-spacer/>
              <v-text-field
                  v-model="newStateName"
                  placeholder="Create your own state!"
                  outlined
                  dense
                  style="margin-right: 10px;"
              />
              <v-btn depressed color="primary" @click="addState" medium>
                Add
              </v-btn>
              <v-spacer/>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" depressed @click="toggleShown">Close</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EditStatesDialog",
  props: ['stateOptions', 'todoList'],
  data: () => ({
    shown: false,
    newStateName: "",
  }),
  methods: {
    toggleShown() {
      this.shown = !this.shown;
    },
    async addState() {
      try {
        const res = await this.$axios.post('/todo-states', {name: this.newStateName});
        const newState = res.data;
        this.$emit('stateCreated', newState);
      } catch(e) {
        console.log(e);
        alert("Sorry, there was an error adding your new state.");
      }
      this.newStateName = "";
    },
    async deleteState(state) {
      if(this.verifyDeletePossible(state)) {
        try {
          await this.$axios.delete(`/todo-states/${state.id}`);
          this.$emit('stateDeleted', state.id);
        } catch(e) {
          console.log(e);
          alert("Sorry there was an error deleting your state.");
        }
      } else {
        alert("You must make sure you don't have any todo items that are currently " +
              "in this state before you can delete it.");
      }
    },
    verifyDeletePossible(state) {
      for(let i = 0; i < this.todoList.length; i++) {
        if(this.todoList[i].state.id == state.id) {
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>