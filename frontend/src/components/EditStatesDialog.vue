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
          Edit your states
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
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
                        Delete <v-icon>mdi-delete</v-icon>
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
                Add <v-icon dense>mdi-plus</v-icon>
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
  props: ['stateOptions'],
  data: () => ({
    shown: false,
    newStateName: "",
  }),
  methods: {
    toggleShown() {
      this.shown = !this.shown;
    },
    async addState() {
      console.log(this.newStateName);
      this.newStateName = "";
    },
    async deleteState(state) {
      console.log(state);
    },
    cancel() {
      this.toggleShown();
    },
  }
}
</script>

<style scoped>

</style>