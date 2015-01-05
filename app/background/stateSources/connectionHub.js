var connections = {};
var MESSAGE = 'message';
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Hub = {
  devtools: new DevtoolsPageConnection(),
  inspectedWindow: new InspectedWindowConnection()
};

module.exports = Hub;

function DevtoolsPageConnection() {
  var events = new EventEmitter();

  this.send = send;
  this.onMessage = onMessage;

  chrome.runtime.onConnect.addListener(onConnect);

  function send(tabId, message) {
    if (tabId in connections) {
      try {
        connections[tabId].postMessage(message);
      } catch (e) {
        console.warn(e);
      }
    }
  }

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

  function onConnect(port) {
    port.onDisconnect.addListener(onDisconnect);
    port.onMessage.addListener(_.partial(onMessageFromDevtools, port));
  }

  function onMessageFromDevtools(port, message) {
    if (message.type === 'INITIALIZE') {
      connections[message.tabId] = port;
    }

    events.emit(MESSAGE, message);
  }

  function onDisconnect(port) {
    port.onMessage.removeListener(onMessage);
    removePort(port);
  }

  function removePort(port) {
    _.each(connections, function (value, key) {
      if (port === value) {
        delete connections[value];
      }
    });
  }
}

function InspectedWindowConnection() {
  var events = new EventEmitter();

  this.onMessage = onMessage;
  chrome.runtime.onMessage.addListener(onMessageFromInspectedWindow);

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

  function onMessageFromInspectedWindow(request, sender) {
    if (sender.tab) {
      events.emit(MESSAGE, sender.tab.id, request);
    }

    return true;
  }
}