process.env['NODE_ENV'] = 'test';

var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);