var EventEmitter = require('events').EventEmitter;
var connection, emitter = new EventEmitter();
var when = require('when');
var started;

emitter.start = function () {
  return started || (started = when.promise(function (resolve, reject) {
    if (!window.chrome.devtools) {
      throw new Error('Cannot connect to background connection out side of devtools page');
    }

    connection = chrome.runtime.connect({
      name: 'marty-devtools'
    });

    connection.postMessage({
      type: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    connection.onMessage.addListener(function (message) {
      if (message.type === 'CONNECTED_TO_MARTY') {
        window.localStorage.setItem('CONNECTED_TO_MARTY', true);
        resolve();
      } else {
        console.log(message.type, message.payload);
        emitter.emit(message.type, message.payload);
      }
    });

    if (isConnectedToMarty()) {
      resolve();
    }
  }));
};

function isConnectedToMarty() {
  return !!window.localStorage.getItem('CONNECTED_TO_MARTY');
}

module.exports = emitter;