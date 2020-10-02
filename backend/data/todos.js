const { sqlClient } = require('../dbs.js');

async function createTodoItem(description, todoStateId, dateDue, ownerUsername) {
    const sql = `INSERT INTO todos
                (description, todo_state_id, date_due, owner_username)
                VALUES ($1, $2, $3, $4)`;
    await sqlClient.query(sql, [description, todoStateId, dateDue, ownerUsername]);
}

async function readTodoItems(ownerUsername) {
    const sql = `SELECT * FROM todos
                    WHERE owner_username = $1`;
    await sqlClient.query(sql, [ownerUsername]);
}

async function readTodoItemById(id) {
    const sql = `SELECT * FROM todos
                    WHERE id = $1`;
    await sqlClient.query(sql, [id]);
}

async function deleteTodoItem(id) {
    const sql = `DELETE FROM todos
                    WHERE id = $1`;
    await sqlClient.query(sql, [id]);
}

async function updateTodoItem(id, description, todoStateId, dateDue) {
    const sql = `UPDATE todos
                SET description = $2,
                    todo_state_id = $3,
                    date_due = $4
                WHERE id = $1`;
    await sqlClient.query(sql, [id, description, todoStateId, dateDue]);
}

module.exports = {
    createTodoItem,
    readTodoItems,
    readTodoItemById,
    deleteTodoItem,
    updateTodoItem
}