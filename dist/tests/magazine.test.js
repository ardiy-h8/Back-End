'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var toBeType = require('jest-tobetype');
var request = require('supertest');
var fs = require('mz/fs');

var app = require('../../dist');

var url = 'http://localhost:3001/graphql';
var file = __dirname + '/src/tests/assets/hp.jpg';
var id = '';

expect.extend(toBeType);

describe('Magazine resolvers', function () {
  test('Mutation createMagazine', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fileExists;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.exists(file);

          case 2:
            fileExists = _context.sent;

            if (fileExists) {
              _context.next = 5;
              break;
            }

            throw new Error('File does not exists');

          case 5:
            return _context.abrupt('return', request(app).post(url).attach('file', file).then(function (res) {
              return console.log(res);
            }).catch(function (err) {
              return console.error(err);
            }));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))

  /* const response = await axios.post(url, { query: `
    mutation {
      createMagazine (
        title: "Harry Potter and the Philosopher's Stone",
        cover: "https://vignette.wikia.nocookie.net/harrypotter/images/c/cb/Philosoper%27s_Stone_New_UK_Cover.jpg/revision/latest/scale-to-width-down/334?cb=20170109041611"
      ) {
        id name cover object3d
      }
    }
  `})
   const { data: { data: { createMagazine }}} = response
  id = createMagazine.id
   expect(createMagazine).toBeType('object')
  expect(createMagazine).toHaveProperty('id')
  expect(createMagazine).toHaveProperty('name')
  expect(createMagazine).toHaveProperty('cover')
  expect(createMagazine).toHaveProperty('object3d')
  expect(createMagazine.id).toBeType('string')
  expect(createMagazine.name).toBeType('string')
  expect(createMagazine.cover).toBeType('string')
  expect(createMagazine.object3d).toBeType('array') */
  );

  test('Mutation updateMagazine', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var response, updateMagazine;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        updateMagazine (id: "' + id + '", name: "Harry Potter and the Deathly Hallows") {\n          id name cover object3d\n        }\n      }\n    ' });

          case 2:
            response = _context2.sent;
            updateMagazine = response.data.data.updateMagazine;


            expect(updateMagazine).toBeType('object');
            expect(updateMagazine).toHaveProperty('id');
            expect(updateMagazine).toHaveProperty('name');
            expect(updateMagazine).toHaveProperty('cover');
            expect(updateMagazine).toHaveProperty('object3d');
            expect(updateMagazine.id).toBeType('string');
            expect(updateMagazine.name).toBeType('string');
            expect(updateMagazine.cover).toBeType('string');
            expect(updateMagazine.object3d).toBeType('array');

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('Mutation deleteMagazine', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response, deleteMagazine;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        deleteMagazine (id: "' + id + '") {\n          id name cover object3d\n        }\n      }\n    ' });

          case 2:
            response = _context3.sent;
            deleteMagazine = response.data.data.deleteMagazine;


            expect(deleteMagazine).toBeType('object');
            expect(deleteMagazine).toHaveProperty('id');
            expect(deleteMagazine).toHaveProperty('name');
            expect(deleteMagazine).toHaveProperty('cover');
            expect(deleteMagazine).toHaveProperty('object3d');
            expect(deleteMagazine.id).toBeType('string');
            expect(deleteMagazine.name).toBeType('string');
            expect(deleteMagazine.cover).toBeType('string');
            expect(deleteMagazine.object3d).toBeType('array');

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});