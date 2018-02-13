'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var toBeType = require('jest-tobetype');
var request = require('supertest');
var fs = require('mz/fs');

var url = 'http://localhost:3001/graphql';
var id = '';

expect.extend(toBeType);

describe('Object 3D resolvers', function () {
  test('Mutation createObject3D', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))
  /* const response = await axios.post(url, { query: `
    mutation createObject3D
  `}) */
  );
});