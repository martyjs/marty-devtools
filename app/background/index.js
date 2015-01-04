// from https://developer.chrome.com/extensions/devtools

var sow = {};
var connections = {};
var connectedToMarty = false;

function processMessage(message) {
  if (message.type === 'DISPATCHING_ACTION') {
    var action = message.payload.action.arguments[0];

    switch (action.type) {
      case 'ACTION_STARTING':
        action.status = 'PENDING';
        sow.actions[action.id] = action;
        break;
      case 'ACTION_FAILED':
        sow.actions[action.id].status = 'FAILED';
        sow.actions[action.id].error = action.error;
        break;
      case 'ACTION_DONE':
        sow.actions[action.id].status = 'DONE';
        break;
    }
  }
}

chrome.runtime.onConnect.addListener(function (port) {

  var extensionListener = function (message) {
    switch (message.type) {
      case 'init':
        connections[message.tabId] = port;
        break;
    }
  };

  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] === port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    }
  }

  return true;
});


