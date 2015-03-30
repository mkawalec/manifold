'use strict';
var _ = require('lodash');

var CHARS = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

module.exports = {
  genRandomString: function(length) {
    length = length || 12;
    return _.map(_.range(length), function() {
      return CHARS[_.random(0, CHARS.length - 1)];
    }).join('');
  }
}
