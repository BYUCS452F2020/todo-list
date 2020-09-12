/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  console.log(`DATABASE_URL=${process.env.DATABASE_URL}`);
  pgm.createTable('users', {
    id: 'id',
    username: {type: 'text', notNull: true},
    password: {type: 'text', notNull: true}
  })
};

exports.down = pgm => {};
