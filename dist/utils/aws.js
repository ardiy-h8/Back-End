'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var uploadS3 = function uploadS3(image) {
  var imageObj = decodeBase64Image(image);
  var imageType = imageObj.mimetype.split('/')[1];

  return new Promise(function (resolve, reject) {
    s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now() + '.' + imageType,
      Body: imageObj.buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/' + imageType
    }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

exports.default = uploadS3;