'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteObject3D = exports.createObject3D = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _download = require('download');

var _download2 = _interopRequireDefault(_download);

var _s3FolderUpload = require('s3-folder-upload');

var _s3FolderUpload2 = _interopRequireDefault(_s3FolderUpload);

var _model = require('../../model');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
  bucket: process.env.S3_BUCKET_NAME
};

var createObject3D = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, args) {
    var markerUrl, patternUrl, zipUrl, dae, files, i, bufferDae, data, objects;
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
            zipUrl = _context.sent;
            dae = '';
            _context.next = 12;
            return (0, _download2.default)(zipUrl.Location, __dirname + '/assets', {
              extract: true
            });

          case 12:
            files = _fs2.default.readdirSync(__dirname + '/assets');
            i = 0;

          case 14:
            if (!(i < files.length)) {
              _context.next = 27;
              break;
            }

            if (!(files[i].substr(-3) === 'dae')) {
              _context.next = 23;
              break;
            }

            bufferDae = _fs2.default.readFileSync(__dirname + '/assets/' + files[i]);
            _context.next = 19;
            return (0, _utils.uploadS3)(bufferDae);

          case 19:
            data = _context.sent;

            dae = data.Location;
            _context.next = 24;
            break;

          case 23:
            (0, _s3FolderUpload2.default)(__dirname + '/assets/' + files[i], credentials);

          case 24:
            i++;
            _context.next = 14;
            break;

          case 27:

            args.img_marker = markerUrl.Location;
            args.marker = patternUrl.Location;
            args.object3d = dae;

            console.log('got marker', patternUrl);

            _context.next = 33;
            return _model.Object3D.create(args);

          case 33:
            objects = _context.sent;
            _context.next = 36;
            return _model.Magazine.findByIdAndUpdate(args.mid, {
              $push: { object3d: objects._id }
            });

          case 36:
            return _context.abrupt('return', objects);

          case 37:
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