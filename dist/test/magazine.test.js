'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var toBeType = require('jest-tobetype');
var fs = require('fs');

var _require = require('../utils'),
    uploadS3 = _require.uploadS3;

expect.extend(toBeType);

var data = fs.readFileSync(__dirname + '/assets/hp.jpg', 'base64');
var matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

var url = 'http://localhost:3001/graphql';
var id = '';
var buffer = fs.readFileSync(__dirname + '/assets/hp.jpg');
var base64 = 'data:image/jpeg;base64,' + Buffer.from(buffer, 'ascii').toString('base64');
var imgUrl = '';

describe('Magazine resolvers', function () {
  beforeAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return uploadS3(base64);

          case 2:
            imgUrl = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  console.log('got url', imgUrl);

  test('Mutation createMagazine', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var response, createMagazine;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.post(url, { query: '\n      mutation {\n        createMagazine (\n          email: "azharie@mail.com",\n          title: "Harry Potter and the Philosopher\'s Stone",\n          imagePreviewUrl: "' + imgUrl.Location + '"\n        ) {\n          id\n        }\n      }\n    ' });

          case 2:
            response = _context2.sent;
            createMagazine = response.data.data.createMagazine;

            id = createMagazine.id;

            expect(createMagazine).toBeType('object');

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  /* test('Mutation updateMagazine', async () => {
    const response = await axios.post(url, {
      query: `
        mutation {
          updateMagazine (
            id: "${id}",
            cover: "${imgUrl.Location}",
            name: "foo"
          ) {
            id
          }
        }
      `})
     const { data: { data: { updateMagazine } } } = response
    expect(updateMagazine).toBeType('object')
    expect(updateMagazine).toHaveProperty('id')
    expect(updateMagazine.id).toEqual(id)
  })
   test('Mutation deleteMagazine', async () => {
    const response = await axios.post(url, {
      query: `
      mutation {
        deleteMagazine (id: "${id}") {
          id
        }
      }
    `})
     const { data: { data: { deleteMagazine } } } = response
    expect(deleteMagazine).toBeType('object')
    expect(deleteMagazine.id).toEqual(id)
  }) */
});