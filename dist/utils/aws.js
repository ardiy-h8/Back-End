'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_awsSdk2.default.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var s3 = new _awsSdk2.default.S3();

var decodeBase64Image = function decodeBase64Image(image) {
  if (image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
    var matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    return {
      mimetype: matches[1],
      buffer: Buffer.from(matches[2], 'base64')
    };
  } else if (image.substr(0, 13) === 'data:;base64,') {
    var dae = image.substring(13, image.length);
    return {
      mimetype: 'image/dae',
      buffer: Buffer.from(dae, 'base64')
    };
  } else {
    return {
      mimetype: 'image/patt',
      buffer: image
    };
  }
};

var upload = function upload(buffer, type) {
  var params = {
    Bucket: 'ardy-test',
    Key: Date.now() + '.' + type,
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/' + type
  };

  return new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

var uploadS3 = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var imageObj, imageType;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!((typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', upload(file, 'dae'));

          case 4:
            imageObj = decodeBase64Image(file);
            imageType = imageObj.mimetype.split('/')[1];
            return _context.abrupt('return', upload(imageObj.buffer, imageType));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function uploadS3(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = uploadS3;