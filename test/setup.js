process.env['NODE_ENV'] = 'test';

var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

var _warn = console.warn;

var messagesToIgnore = [
  'Something is calling a React component directly'
];

console.warn = function (message) {
  try {
    if (!shouldIgnore(message)) {
      _warn.apply(console, arguments);
    }
  } catch (e) {
    _warn.apply(console, arguments);
  }
};