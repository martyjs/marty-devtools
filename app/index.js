var shimConsole = require('./chrome/shimConsole');
var MartyPanel = require('./components/martyPanel');
var connection = require('./chrome/backgroundConnection');
var ActionActionCreators = require('./actions/actionActionCreators');

shimConsole(window.console);

connection.start();
connection.on('ACTION_DISPATCHED', function (e) {
  ActionActionCreators.upsertAction(e.action);
});

var panel = new MartyPanel();
panel.markAsRoot();
panel.show(document.getElementById('main-panel-holder'));
WebInspector.installPortStyles();