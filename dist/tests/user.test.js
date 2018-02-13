'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var toBeType = require('jest-tobetype');

var url = 'http://localhost:3001/graphql';
var id = '';

expect.extend(toBeType);

describe('User resolvers', function () {
  test('Query allUsers', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response, allUsers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.post(url, { query: '\n      query {\n        allUsers {\n          id email password\n        }\n      }\n    ' });

          case 2:
            response = _context.sent;
            allUsers = response.data.data.allUsers;

            expect(allUsers).toBeType('array');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('Mutation createUser', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var response, createUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        createUser (email: "yofri@mail.com", password: "letmein") {\n          id email password\n        }\n      }\n    ' });

          case 2:
            response = _context2.sent;
            createUser = response.data.data.createUser;

            id = createUser.id;

            expect(createUser).toBeType('object');
            expect(createUser).toHaveProperty('id');
            expect(createUser).toHaveProperty('email');
            expect(createUser).toHaveProperty('password');
            expect(createUser.id).toBeType('string');
            expect(createUser.email).toBeType('string');
            expect(createUser.password).toBeType('string');

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('Mutation updateUser', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response, updateUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        updateUser (id: "' + id + '", email: "yofri@mail.com", password: "letmeout") {\n          id email password\n        }\n      }\n    ' });

          case 2:
            response = _context3.sent;
            updateUser = response.data.data.updateUser;


            expect(updateUser).toBeType('object');
            expect(updateUser).toHaveProperty('id');
            expect(updateUser).toHaveProperty('email');
            expect(updateUser).toHaveProperty('password');

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('Mutation deleteUser', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var response, deleteUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        deleteUser (id: "' + id + '") {\n          id email password\n        }\n      }\n    ' });

          case 2:
            response = _context4.sent;
            deleteUser = response.data.data.deleteUser;


            expect(deleteUser).toBeType('object');
            expect(deleteUser).toHaveProperty('id');
            expect(deleteUser).toHaveProperty('email');
            expect(deleteUser).toHaveProperty('password');

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});