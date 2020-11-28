const { mongooseClient } = require("../dbs");

const todoStateSchema = {
  name: String,
  ownerUsername: String
};

const TodoState = mongooseClient.model('TodoState', todoStateSchema);

async function createTodoState(name, ownerUsername) {
  let todoState = new TodoState({
    name,
    ownerUsername
  });

  return await todoState.save();
}

async function readTodoStates(ownerUsername) {
  return TodoState.find({ownerUsername});
}

async function readTodoStateById(id) {
  return TodoState.findOne({ _id: id });
}

async function deleteTodoState(id) {
  TodoState.deleteOne({ _id: id });
}

module.exports = {
  createTodoState,
  readTodoStates,
  readTodoStateById,
  deleteTodoState
};
