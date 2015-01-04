var connection = require('./backgroundConnection');

connection.start().then(function () {
  chrome.devtools.panels.create('Marty', null, 'app/panel/index.html', function(panel) {
    panel.onShown.addListener(onPanelShown);
  });

  function onPanelShown(panel) {
    if (!panel.initialized) {
      panel.focus();
      panel.initialize(connection);
      panel.initialized = true;
    }
  }
});