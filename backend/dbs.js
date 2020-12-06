const { Client } = require('pg');
const mongooseClient = require('mongoose');

const sqlClient = new Client({
  connectionString: "postgres://postgres:postgres@localhost:5432/todo"
});

mongooseClient.connect(`mongodb://localhost:27017/todo`, { useNewUrlParser: true, useUnifiedTopology: true });

//sqlClient.connect();

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
  closeSQLConnection,
  mongooseClient
};

