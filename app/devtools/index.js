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
    connection.on('RECEIVE_DISPATCH', addDispatchToSOW);

    panel.onShown.addListener(onPanelShown);
  });

  function addDispatchToSOW(dispatch) {
    sow.dispatches.push(dispatch);
  }

  function onPanelShown(panel) {
    connection.removeListener('RECEIVE_DISPATCH', addDispatchToSOW);

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