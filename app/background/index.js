var connectionHub = require('./stateSources/connectionHub');

connectionHub.inspectedWindow.onMessage(function (tabId, message) {
  connectionHub.devtools.send(tabId, message);
});