// var version = '0.7.2';

function initialize(options) {
  var connection = options.connection;
  var shimConsole = require('./chrome/shimConsole');
  var MartyPanel = require('./components/martyPanel');
  var ActionActionCreators = require('./actions/actionActionCreators');
  var ApplicationActionCreators = require('./actions/applicationActionCreators');

  shimConsole(window.console);

  connection.on('UPSERT_ACTION', function (action) {
    ActionActionCreators.upsertAction(action);
  });

  connection.on('CLEAR_ACTIONS', function () {
    ActionActionCreators.clearActions();
  });

  ApplicationActionCreators.applicationLoaded(options.sow);

  var panel = new MartyPanel();
  panel.markAsRoot();
  panel.show(document.getElementById('main-panel-holder'));
  WebInspector.installPortStyles();
}

window.initialize = initialize