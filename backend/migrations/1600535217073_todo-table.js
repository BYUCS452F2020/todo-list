/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('todo_states', {
    id: 'id',
    name: {type: 'text', notNull: true},
    owner_username: {type: 'text'}
  });

  pgm.createTable('todos', {
    id: 'id',
    description: {type: 'text', notNull: true},
    todo_state_id: {type: 'int', notNull: true},
    date_due: {type: 'date', notNull: true},
    owner_username: {type: 'text', notNull: true}
  })
};

exports.down = pgm => {
  pgm.dropTable('todo_states');
  pgm.dropTable('todos');
};


