<template>
  <div>
    <v-btn color="warning" @click="toggleShown">
      Edit
    </v-btn>
    <v-dialog v-model="shown"
              max-width="600px">
      <v-card>
        <v-card-title>
          Edit this Item
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Description"
                            placeholder="What do you want to do?"
                            v-model="item.description"/>
              <v-select :items="stateOptions"
                        label="State"
                        item-text="name"
                        return-object
                        :value="item.state.name"
                        style="max-width: 150px"
                        class="pl-3"
              />
            </v-row>
            <v-row justify="center">
              <v-col/>
              <v-col class="text-center">
                <span class="headline">Due Date</span>
                <v-date-picker
                    :value="formattedDate"
                    @change="dateChanged"
                />
              </v-col>
              <v-col/>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" depressed @click="cancel">Cancel</v-btn>
            <v-btn color="primary" depressed @click="updateItem">Save</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import moment from 'moment';
export default {
  name: "EditItemDialog",
  props: ['item', 'stateOptions'],
  data: () => ({
    shown: false,
    updatedItem: {
      id: "",
      description: "",
      todoStateId: "",
      dateDue: "",
      ownerUsername: "",
    }
  }),
  methods: {
    async updateItem() {

      try {
        await this.$axios.put('/todos', this.item);
        this.toggleShown();
        this.$emit('itemUpdated', this.updatedItem);
        alert('The todo was successfully updated!')
      } catch (e) {
        console.log(e);
        alert("There was an error attempting to save the updated todo. Please try again later.")
      }
    },
    cancel() {
      this.shown = false
    },
    toggleShown(){
      this.shown = !this.shown
    },
    dateChanged(newDate){
      this.item.dateDue = newDate
    }
  },
  computed: {
    formattedDate() {
      return moment(this.item.dateDue).toISOString().substr(0, 10)
    }
  }
}
</script>

<style scoped>

</style>
