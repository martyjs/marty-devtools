function initialize(options) {
  var connection = options.connection;
  var StoreStore = require('./stores/storeStore');
  var ActionStore = require('./stores/actionStore'); // jshint ignore:line
  var shimConsole = require('./chrome/shimConsole'); // jshint ignore:line
  var PageActionCreators = require('./actions/pageActionCreators');
  var ActionActionCreators = require('./actions/actionActionCreators');

  shimConsole(window.console);

  connection.on('*', function () {
    console.log(arguments);
  })

  connection.on('ACTION_DISPATCHED', function (dispatch) {
    ActionActionCreators.actionDispatched(dispatch);
  });

  connection.on('PAGE_LOADED', function (sow) {
    PageActionCreators.pageLoaded(sow);
  });

  PageActionCreators.pageLoaded(options.sow);

  try {
    renderMartyPanel();
  } catch (e) {
    console.error('Failed to render panel', e, e.stack);
  }
}

function renderMartyPanel() {
  var MartyPanel = require('./components/martyPanel');
  var panel = new MartyPanel();
  panel.markAsRoot();
  panel.show(document.getElementById('main-panel-holder'));
  WebInspector.installPortStyles();
}

window.initialize = initialize
window.renderMartyPanel = renderMartyPanel;