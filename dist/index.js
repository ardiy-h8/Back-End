'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('./config');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT;

app.use((0, _cors2.default)());
app.use('/graphql', (0, _morgan2.default)('dev'), _bodyParser2.default.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }), (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default }));
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

_config.connection.on('error', function () {
  return console.log('Error connecting to database');
});
_config.connection.on('open', function () {
  return console.log('Connected to database');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    return console.log('API started on port ' + port);
  });
}

exports.default = app;