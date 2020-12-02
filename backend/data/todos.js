const { mongooseClient } = require("../dbs");
const mongoose = require("mongoose");

const todoSchema = {
    description: String,
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoState'
    },
    dateDue: String,
    ownerUsername: String
}

const Todo = mongooseClient.model('Todo', todoSchema);

async function createTodoItem(description, todoStateId, dateDue, ownerUsername) {
    let todo = new Todo({
        description,
        state: todoStateId,
        dateDue,
        ownerUsername
    });

    return await todo.save();
}

async function readTodoItems(ownerUsername) {
    return Todo.find({ownerUsername}).populate('state');
}

async function readTodoItemById(id) {
    return Todo.findOne({ _id: id });
}

async function deleteTodoItem(id) {
    return Todo.deleteOne({ _id: id }).catch((e) => {
        console.log(e);
    });
}

async function updateTodoItem(id, description, todoStateId, dateDue, ownerUsername) {
    Todo.deleteOne({ _id: id }).catch((e) => {
        console.log(e);
    });
    let updatedTodo = new Todo({
        description,
        state: todoStateId,
        dateDue,
        ownerUsername
    });
    updatedTodo.save();
}

module.exports = {
    createTodoItem,
    readTodoItems,
    readTodoItemById,
    deleteTodoItem,
    updateTodoItem
}
