function BackgroundConnection() {
  var connection;

  this.start = start;

  function start() {
    try {
      connection = chrome.runtime.connect({
        name: 'marty-devtools'
      });

      connection.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId
      });
    } catch (e) {
      console.error('Failed to connect to background page');
    }
  }
}

module.exports = BackgroundConnection;