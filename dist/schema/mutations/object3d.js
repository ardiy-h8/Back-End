'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteObject3D = exports.createObject3D = undefined;

var _model = require('../../model');

var _utils = require('../../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createObject3D = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args) {
    var markerUrl, patternUrl, object3dUrl, objects;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.uploadS3)(args.img_marker);

          case 2:
            markerUrl = _context.sent;
            _context.next = 5;
            return (0, _utils.uploadS3)(args.marker);

          case 5:
            patternUrl = _context.sent;
            _context.next = 8;
            return (0, _utils.uploadS3)(args.object3d);

          case 8:
            object3dUrl = _context.sent;


            args.img_marker = markerUrl.Location;
            args.marker = patternUrl.Location;
            args.object3d = object3dUrl.Location;

            console.log('got marker', patternUrl);

            _context.next = 15;
            return _model.Object3D.create(args);

          case 15:
            objects = _context.sent;
            _context.next = 18;
            return _model.Magazine.findByIdAndUpdate(args.mid, {
              $push: { object3d: objects._id }
            });

          case 18:
            return _context.abrupt('return', objects);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createObject3D(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var deleteObject3D = function deleteObject3D(_, _ref2) {
  var id = _ref2.id;
  return _model.Object3D.findByIdAndRemove(id);
};

exports.createObject3D = createObject3D;
exports.deleteObject3D = deleteObject3D;