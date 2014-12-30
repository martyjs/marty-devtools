var EventEmitter = require('events').EventEmitter;
var connection, emitter = new EventEmitter();

emitter.start = function () {
  if (!window.chrome.devtools) {
    console.warn('Cannot connect to background connection out side of devtools page');
    return;
  }

  try {
    connection = chrome.runtime.connect({
      name: 'marty-devtools'
    });

    connection.postMessage({
      type: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    connection.onMessage.addListener(function (message) {
      emitter.emit(message.type, message.payload);
    });
  } catch (e) {
    console.error('Failed to connect to background page');
  }
};

module.exports = emitter;