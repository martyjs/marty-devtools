var connections = {};
var MESSAGE = 'message';
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var eventTypes = ['PAGE_LOADED', 'PAGE_UNLOADED', 'RECEIVE_DISPATCH'];

module.exports = {
  Devtools: new DevtoolsPageConnection(),
  InspectedWindow: new InspectedWindowConnection()
};

function DevtoolsPageConnection() {
  var sockets = {};
  var events = new EventEmitter();

  this.send = send;
  this.onMessage = onMessage;
  this.onConnect = onConnect;

  function onMessage(cb, context) {
    if (context) {
      cb = _.bind(cb, context);
    }

    events.on(MESSAGE, cb);

    return {
      dispose: function () {
        events.removeListener(MESSAGE, cb);
      }
    };
  }

  function send(tabId, message) {
    var socket = sockets[tabId];
    if (socket) {
      socket.emit(MESSAGE, message);
    }
  }

  function onConnect(tabId, socket) {
    sockets[tabId] = socket;

    eventTypes.forEach(function (eventType) {
      socket.on(eventType, function (message) {
        events.emit(MESSAGE, message);
      });
    });

    events.emit(MESSAGE, {
      tabId: tabId,
      type: 'LOADED'
    });
  }
}

function InspectedWindowConnection() {
  var events = new EventEmitter();

  this.onMessage = onMessage;
  this.receiveMessage = receiveMessage;

  function onMessage(cb, context) {
    if (context) {
      cb = _.bind(cb, context);
    }

    events.on(MESSAGE, cb);

    return {
      dispose: function () {
        events.removeListener(MESSAGE, cb);
      }
    };
  }

  function receiveMessage(tabId, message) {
    events.emit(MESSAGE, tabId, message);
  }
}