function initialize(options) {
  var connection = options.connection;
  var StoreStore = require('./stores/storeStore');
  var ActionStore = require('./stores/actionStore'); // jshint ignore:line
  var shimConsole = require('./chrome/shimConsole'); // jshint ignore:line
  var PageActionCreators = require('./actions/pageActionCreators');
  var StoreActionCreators = require('./actions/storeActionCreators');
  var ActionActionCreators = require('./actions/actionActionCreators');

  shimConsole(window.console);

  connection.on('UPSERT_ACTION', function (action) {
    console.log('UPSERT_ACTION', action);
    ActionActionCreators.upsertAction(action);
  });

  connection.on('UPSERT_STORE', function (store) {
    console.log('UPSERT_STORE', store);
    StoreActionCreators.upsertStore(store);
  });

  connection.on('PAGE_LOADED', function (sow) {
    console.log('PAGE_LOADED', sow);
    PageActionCreators.pageLoaded(sow);
  });

  console.log('SOW', options.sow);
  PageActionCreators.pageLoaded(options.sow);

  try {
    renderMartyPanel();
  } catch (e) {
    console.error('Failed to render panel', e);
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