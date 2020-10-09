const { sqlClient } = require('../dbs.js');
const argon2 = require('argon2');

async function hashPassword(password) {
    return argon2.hash(password);
}

async function createUser(username, password) {
  const sql = "INSERT INTO users (username, password) VALUES ($1, $2)";
  password = await hashPassword(password);
  await sqlClient.query(sql, [username, password]);
  return await readUser(username);
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

async function comparePassword(argonHash, plainText) {
  try {
    return await argon2.verify(argonHash, plainText)
  } catch (e) {
    console.log(e);
    return false
  }
}

module.exports = {
  createUser,
  readUser,
  comparePassword
};
