// var version = '0.7.2';

function initialize(connection) {
  var shimConsole = require('./chrome/shimConsole');
  var MartyPanel = require('./components/martyPanel');
  var ActionActionCreators = require('./actions/actionActionCreators');

  shimConsole(window.console);

  connection.on('ACTION_DISPATCHED', function (e) {
    ActionActionCreators.upsertAction(e.action);
  });

  connection.on('PAGE_UNLOAD', function () {
    ActionActionCreators.clearActions();
  });

  var panel = new MartyPanel();
  panel.markAsRoot();
  panel.show(document.getElementById('main-panel-holder'));
  WebInspector.installPortStyles();
}

window.initialize = initialize