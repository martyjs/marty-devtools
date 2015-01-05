var EventEmitter = require('events').EventEmitter;
var connection, emitter = new EventEmitter();
var when = require('when');

emitter.start = function () {
  return when.promise(function (resolve, reject) {
    if (!window.chrome.devtools) {
      throw new Error('Cannot connect to background connection out side of devtools page');
    }

    connection = chrome.runtime.connect({
      name: 'marty-devtools'
    });

    connection.postMessage({
      type: 'INITIALIZE',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    connection.onMessage.addListener(function (message) {
      if (message.type === 'SOW') {
        resolve(message.payload);
      }

      emitter.emit(message.type, message.payload);
    });
  });
};

function martyFound(message) {
  if (message.type === 'MARTY_FOUND') {
    return message.payload === true;
  }

  if (message.type === 'SOW') {
    return message.payload.martyFound === true;
  }

  return false;
}

module.exports = emitter;