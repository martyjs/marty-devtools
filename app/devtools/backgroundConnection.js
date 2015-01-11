var EventEmitter = require('events').EventEmitter;
var connection, emitter = new EventEmitter();

emitter.open = function () {
  if (!window.chrome.devtools) {
    throw new Error('Cannot connect to background connection out side of devtools page');
  }

  connection = chrome.runtime.connect({
    name: 'marty-devtools'
  });

  connection.onMessage.addListener(function (message) {
    emitter.emit(message.type, message.payload);
  });

  connection.postMessage({
    type: 'LOADED',
    tabId: chrome.devtools.inspectedWindow.tabId
  });
};

module.exports = emitter;