var MartyPanel = require('./components/martyPanel');
var connection = require('./chrome/backgroundConnection');
var shimConsole = require('./chrome/shimConsole');

connection.start();
shimConsole(window.console);

var panel = new MartyPanel();
panel.markAsRoot();
panel.show(document.getElementById('main-panel-holder'));
WebInspector.installPortStyles();
