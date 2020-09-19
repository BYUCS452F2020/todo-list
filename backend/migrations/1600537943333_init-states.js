/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.db.query(`INSERT INTO todo_states (name) VALUES ('Created')`);
  pgm.db.query(`INSERT INTO todo_states (name) VALUES ('Completed')`);
};

exports.down = pgm => {
  pgm.db.query(`DELETE FROM todo_states`)
};
