const { sqlClient } = require('../dbs.js');

async function createTodoItem(description, todoStateId, dateDue, ownerUsername) {
    const sql = `INSERT INTO todos
                (description, todo_state_id, date_due, owner_username)
                VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } =  await sqlClient.query(sql, [
        description,
        todoStateId,
        dateDue,
        ownerUsername
    ]);
    return rows[0];
}

async function readTodoItems(ownerUsername) {
    const sql = `SELECT todos.id, 
                        description, 
                        date_due, 
                        todo_states.id AS todo_state_id,
                        todo_states.name AS todo_state_name
                    FROM todos, todo_states
                    WHERE todos.todo_state_id = todo_states.id
                    AND todos.owner_username = $1`;
    const { rows } = await sqlClient.query(sql, [ownerUsername]);
    let res = [];
    for (const row of rows) res.push({
        id: row.id,
        description: row.description,
        dateDue: row.date_due,
        state: {
            id: row.todo_state_id,
            name: row.todo_state_name
        }
    });
    return res;
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
