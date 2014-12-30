// from https://developer.chrome.com/extensions/devtools

var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

  var extensionListener = function (message) {
    switch (message.type) {
      case 'init': connections[message.tabId] = port; break;
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