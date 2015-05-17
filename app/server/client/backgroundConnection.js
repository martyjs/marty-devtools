var io = require('socket.io-client');
var EventEmitter = require('events').EventEmitter;
var connection = new EventEmitter();

connection.open = function () {
  var socket = io({
    query: 'port=' + getPort()
  });

  connection.postMessage = socket.emit.bind(socket);

  socket.on('connect', function () {
    console.log('connection established');
  });

  socket.on('message', function (message) {
    console.log(`${message.type}`);
    connection.emit(message.type, message.payload);
  });
};

function getPort() {
  var port = getParameterByName('port');

  if (port === '') {
    return 5858;
  }

  return parseInt(port);
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

module.exports = connection;