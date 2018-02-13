'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _magazine = require('./magazine');

var _object3d = require('./object3d');

exports.default = {
  createUser: _user.createUser, updateUser: _user.updateUser, deleteUser: _user.deleteUser,
  createMagazine: _magazine.createMagazine, updateMagazine: _magazine.updateMagazine, deleteMagazine: _magazine.deleteMagazine,
  createObject3D: _object3d.createObject3D, deleteObject3D: _object3d.deleteObject3D
};