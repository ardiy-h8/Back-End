'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = undefined;

var _model = require('../../model');

var createUser = function createUser(_, args) {
  return _model.User.create(args);
};

var updateUser = function updateUser(_, args) {
  return _model.User.findByIdAndUpdate(args.id, args, { new: true });
};

var deleteUser = function deleteUser(_, _ref) {
  var id = _ref.id;
  return _model.User.findByIdAndRemove(id);
};

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;