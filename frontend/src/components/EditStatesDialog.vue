<template>
  <v-dialog v-model="editStatesDialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Create A New Item
      </v-card-title>
      <v-card-text>
        <v-container>
          Implement This!!
        </v-container>
        <v-card-actions>
          <v-btn color="primary" depressed @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditStatesDialog",
  props: ['editStatesDialogVisible', 'stateItems', 'setDialogVisibility'],
  data: () => {

  },
  methods: {
    closeDialog() {
      this.setDialogVisibility(false);
    }
  }
}
</script>

<style scoped>

</style>