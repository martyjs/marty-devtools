var initialized = false;
var connection = require('./backgroundConnection');

connection.on('PAGE_LOADED', onPageLoaded);
connection.open();

function onPageLoaded(sow) {
  if (sow.martyFound && !initialized) {
    showPanel(sow);
    initialized = true;
  }
}

function showPanel(sow) {
  chrome.devtools.panels.create('Marty', null, 'app/panel/index.html', function (panel) {
    panel.onShown.addListener(onPanelShown);
  });

  function onPanelShown(panel) {
    panel.focus();
    panel.initialize({
      sow: sow,
      connection: connection
    });
  }
}