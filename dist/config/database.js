'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
_mongoose2.default.connect(process.env.DB_URI);
var connection = _mongoose2.default.connection;

exports.mongoose = _mongoose2.default;
exports.connection = connection;