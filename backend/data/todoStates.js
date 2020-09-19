const { sqlClient } = require('../dbs.js');

async function createTodoState(name, ownerUsername) {
  const sql = `INSERT INTO todo_states 
                (name, owner_username)
                VALUES ($1, $2)`;
  await sqlClient.query(sql, [name, ownerUsername])
}

// TODO: Create delete method

module.exports = {
  createTodoState
};
