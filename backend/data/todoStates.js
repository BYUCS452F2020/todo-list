const { sqlClient } = require('../dbs.js');

async function createTodoState(name, ownerUsername) {
  const sql = `INSERT INTO todo_states 
                (name, owner_username)
                VALUES ($1, $2)`;
  await sqlClient.query(sql, [name, ownerUsername]);
}

async function deleteTodoState(id) {
  //TODO: Is it here that we want to check if they have any items that currently are in this state?
  const sql = `DELETE FROM todo_states
                WHERE id = $1`;
  await sqlClient.query(sql, [id]);
}

module.exports = {
  createTodoState,
  deleteTodoState
};
