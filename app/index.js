var MartyPanel = require('./components/martyPanel');

WebInspector.installPortStyles();
var panel = new MartyPanel();
panel.markAsRoot();
panel.show(document.getElementById('main-panel-holder'));
