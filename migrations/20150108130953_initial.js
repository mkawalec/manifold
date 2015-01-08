'use strict';
var _ = require('lodash');

function addId(knex, t) {
  t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    .index().primary();
}

exports.up = function(knex, Promise) {
  return new Promise(function(res) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public')
      .then(function() {
        return knex.schema.createTable('users', function(t) {
          addId(knex, t);
          t.string('username').notNull();
          t.string('password').notNull();

          t.string('email');
        });
      }).then(function() {
        return knex.schema.createTable('posts', function(t) {
          addId(knex, t);
          t.text('post');

          t.timestamp('created_at').defaultTo(knex.raw('now()')).notNull();
          t.timestamp('updated_at');
        });
      }).then(function() {
        return knex.schema.createTable('users_posts', function(t) {
          t.uuid('users_id').notNull().references('id').inTable('users');
          t.uuid('posts_id').notNull().references('id').inTable('posts');
          t.primary([ 'users_id', 'posts_id' ]);
        });
      }).then(res);
  });
};

exports.down = function(knex, Promise) {
  
};
