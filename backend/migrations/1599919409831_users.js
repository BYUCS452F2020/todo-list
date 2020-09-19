/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: {type: 'text', notNull: true},
    password: {type: 'text', notNull: true}
  })
};

exports.down = pgm => {};
