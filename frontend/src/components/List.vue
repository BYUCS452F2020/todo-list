<template>
  <div>
    <v-list
        subheader
        flat
    >
      <h1>Things to do</h1>
      <v-list-item-group v-model="checked" multiple>
        <v-list-item v-for="(item, idx) in todoItems" :key="idx" @click="handleCheck(item)">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.state"></v-list-item-subtitle>
              <v-list-item-subtitle>{{item.timeDue}}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

<!--  <p>Checked Items:</p>-->
<!--  <pre>{{ checked }}</pre>-->
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    checked: [],
    // This is dummy data for UI testing TODO: Remove the dummy data and use api to populate todoItems
    //Probably will use moment for timeDue
    todoItems: [
      {
        title: "Tell Carson he is a total git",
        state: "past due",
        timeDue: "12:30 am 9/13/20",
        ownerUsername: "logiBear"
      },
      {
        title: "Crush Carson at some game",
        state: "new",
        timeDue: " 12:30 am 9/17/20",
        ownerUsername: "logiBear"
      },
      {
        title: "Each lunch with Megan",
        state: "new",
        timeDue: " 12:30 pm 9/18/20",
        ownerUsername: "logiBear"
      },
      {
        title: "Finish building Todo-List project",
        state: "in progress",
        timeDue: " 11:59 pm 9/30/20",
        ownerUsername: "logiBear"
      },
      {
        title: "Talk to Mimi about what it's like being married to a git like Carson",
        state: "new",
        timeDue: " 5:45 pm 10/10/20",
        ownerUsername: "logiBear"
      }
    ],
  }),
  methods: {
    handleCheck(item) {
      let idx = this.checked.indexOf(item);
      if(idx === -1) {
        this.checked.push(item);
      } else {
        this.checked.splice(idx, 1);
      }
    }
  }
}
</script>

<style scoped>

</style>