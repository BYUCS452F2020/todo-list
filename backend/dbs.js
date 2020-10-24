const { Client } = require('pg');
const sqlClient = new Client({
  connectionString: "postgres://postgres:postgres@localhost:5432/todo"
});

sqlClient.connect();

async function closeSQLConnection(commit) {
  if (commit) {
    await sqlClient.query('COMMIT')
  } else {
    await sqlClient.query('ROLLBACK')
  }
}

async function beginSQLTransaction() {
  await sqlClient.query('BEGIN');
}

module.exports = {
  sqlClient,
  beginSQLTransaction,
  closeSQLConnection
};

