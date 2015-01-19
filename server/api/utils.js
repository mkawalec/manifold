'use strict';

var Joi = require('joi');

module.exports = {
  JoiUUID: Joi.string().regex(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)
};
