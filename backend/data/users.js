const { sqlClient } = require('../dbs.js');
const argon2 = require('argon2');

async function hashPassword(password) {
    return argon2.hash(password);
}

async function createUser(username, password) {
  const sql = "INSERT INTO users (username, password) VALUES ($1, $2)";
  password = await hashPassword(password);
  sqlClient.query(sql, [username, password], (err) => {
    if (err) {
      throw err
    } else {
      return `Successfully created the user with the username of ${username}.`
    }
  })
}

async function readUser(username) {
  const sql = `SELECT * 
               FROM users 
               WHERE username = $1`;
  const res = await sqlClient.query(sql, [username]);
  if (res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
}

async function comparePassword(password) {

}

module.exports = {
  createUser,
  readUser,
  comparePassword
};
