'use strict';

var config = require('./config');
var knex = require('knex')(config.get('/knex/options'));
var crypto = require('crypto');

console.log('Running migrations...');

function genPassword(salt, password) {
  var hash = crypto.createHash('sha512');
  hash.update(salt + password);

  return hash.digest('base64');
}

knex.migrate.latest()
.then(function(results) {
  if (results[1]) {
    results[1].forEach(function(migration) {
      console.log(' -> Ran ' + migration);
    });
  }

  knex('users').count('*').then(function(count) {
    if (parseInt(count[0].count) === 0) {
      var salt = crypto.randomBytes(128).toString('base64');

      return knex('users').insert({
        username: 'admin',
        password: genPassword(salt, 'admin12'),
        salt: salt
      });
    } else {
      return false;
    }
  }).then(function() {
    knex.migrate.currentVersion()
    .then(function(version) {
      console.log('Migrated to ' + version);
      process.exit();
    });
  });
});

