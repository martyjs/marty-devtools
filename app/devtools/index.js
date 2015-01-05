var _ = require('underscore');
var connection = require('./backgroundConnection');

connection.start().then(function (sow) {
  if (sow.martyFound) {
    showPanel(sow);
  } else {
    connection.on('MARTY_FOUND', _.partial(showPanel, sow));
  }
});

function showPanel(sow) {
  chrome.devtools.panels.create('Marty', null, 'app/panel/index.html', function (panel) {
    panel.onShown.addListener(onPanelShown);
  });

  function onPanelShown(panel) {
    if (!panel.initialized) {
      panel.focus();
      panel.initialize({
        sow: sow,
        connection: connection
      });
      panel.initialized = true;
    }
  }
}