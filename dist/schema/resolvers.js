'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../model');

var _utils = require('../utils');

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
  Query: _queries2.default,
  Mutation: _mutations2.default
};

exports.default = resolvers;