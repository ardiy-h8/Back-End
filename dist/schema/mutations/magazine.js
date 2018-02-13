'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMagazine = exports.updateMagazine = exports.createMagazine = undefined;

var _model = require('../../model');

var _utils = require('../../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createMagazine = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.uploadS3)(args.imagePreviewUrl);

          case 2:
            data = _context.sent;

            args.imagePreviewUrl = data.Location;
            return _context.abrupt('return', _model.Magazine.create(args));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createMagazine(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateMagazine = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, args) {
    var coverUrl;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!args.imagePreviewUrl) {
              _context2.next = 8;
              break;
            }

            _context2.next = 3;
            return (0, _utils.uploadS3)(args.imagePreviewUrl);

          case 3:
            coverUrl = _context2.sent;

            args.imagePreviewUrl = coverUrl.Location;
            return _context2.abrupt('return', _model.Magazine.findByIdAndUpdate(args.id, args, { new: true }));

          case 8:
            return _context2.abrupt('return', _model.Magazine.findByIdAndUpdate(args.id, args, { new: true }));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateMagazine(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteMagazine = function deleteMagazine(_, _ref3) {
  var id = _ref3.id;
  return _model.Magazine.findByIdAndRemove(id);
};

exports.createMagazine = createMagazine;
exports.updateMagazine = updateMagazine;
exports.deleteMagazine = deleteMagazine;