'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../../model');

exports.default = {
  allUsers: function allUsers() {
    return _model.User.find();
  },
  allMagazines: function allMagazines() {
    return _model.Magazine.find().populate('object3d');
  }
};