'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (zip) {
  var matches = zip.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  return {
    mimetype: matches[1],
    buffer: Buffer.from(matches[2], 'base64')
  };
};