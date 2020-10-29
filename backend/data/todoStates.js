const { sqlClient } = require('../dbs.js');

async function createTodoState(name, ownerUsername) {
  const sql = `INSERT INTO todo_states 
                (name, owner_username)
                VALUES ($1, $2) RETURNING *`;
  const { rows } = await sqlClient.query(sql, [name, ownerUsername]);
  return rows[0];
}

async function readTodoStates(ownerUsername) {
  const sql = `SELECT * FROM todo_states
                    WHERE owner_username = $1
                        OR owner_username IS NULL`;
  const { rows } = await sqlClient.query(sql, [ownerUsername]);
  return rows
}

async function readTodoStateById(id) {
  const sql = `SELECT * FROM todos
                    WHERE id = $1`;
  const { rows } = await sqlClient.query(sql, [id]);
  return rows;
}

async function deleteTodoState(id) {
  const sql = `DELETE FROM todo_states
                WHERE id = $1`;
  await sqlClient.query(sql, [id]);
}

module.exports = {
  createTodoState,
  readTodoStates,
  readTodoStateById,
  deleteTodoState
};
