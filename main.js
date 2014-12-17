var backgroundPageConnection = chrome.runtime.connect({
    name: "marty-devtools"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

// backgroundPageConnection.onMessage.addListener(function (message) {
//   results.appendChild(createRow("action created"));
// });


chrome.devtools.panels.create(
  'Marty', null, 'views/devpanel.html', function(panel) {
    panel.onShown.addListener(function (mainPanelWindow) {
      mainPanelWindow.focus();
      mainPanelWindow.initialize({
        connection: backgroundPageConnection
      });

      mainPanelWindow.wasShown = true;
    });
  }
);