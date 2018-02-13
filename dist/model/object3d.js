'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Object3D = _mongoose2.default.model('objects', {
  mid: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'magazines',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  marker: { type: String, required: true },
  img_marker: { type: String, required: true },
  object3d: { type: String, required: true }
});

exports.default = Object3D;