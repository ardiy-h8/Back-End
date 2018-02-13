'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Magazine = _mongoose2.default.model('magazines', {
  email: { type: String, required: true },
  title: { type: String, required: true },
  imagePreviewUrl: { type: String, required: true },
  object3d: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'objects'
  }]
});

exports.default = Magazine;