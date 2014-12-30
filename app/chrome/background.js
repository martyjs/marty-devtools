// from https://developer.chrome.com/extensions/devtools

var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

  var extensionListener = function (message, sender, sendResponse) {
    switch (message.type) {
      case 'init': connections[message.tabId] = port; break;
    }
  }

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      // console.log('Tab not found in connection list.');
    }
  } else {
    // console.log('sender.tab not defined.');
  }
  return true;
});

var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'marty-devtools') {
    if (openCount == 0) {
      // console.log('DevTools window opening.');
    }

    openCount++;

    port.onDisconnect.addListener(function (port) {
      openCount--;
      if (openCount == 0) {
        // console.log('Last DevTools window closing.');
      }
    });
  }
});