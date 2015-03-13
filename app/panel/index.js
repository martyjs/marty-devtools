function initialize(options) {
  var connection = options.connection;
  var StoreStore = require('./stores/storeStore');
  var ActionStore = require('./stores/actionStore'); // jshint ignore:line
  var shimConsole = require('./chrome/shimConsole'); // jshint ignore:line
  var DispatchStore = require('./stores/dispatchStore'); // jshint ignore:line
  var PageActionCreators = require('./actions/pageActionCreators');
  var DispatchActionCreators = require('./actions/dispatchActionCreators');

  shimConsole(window.console);

  connection.on('RECEIVE_DISPATCH', function (dispatch) {
    DispatchActionCreators.receiveDispatch(dispatch);
  });

  connection.on('PAGE_LOADED', function (sow) {
    PageActionCreators.pageLoaded(sow);
  });


  try {
    PageActionCreators.pageLoaded(options.sow, options.connection);

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