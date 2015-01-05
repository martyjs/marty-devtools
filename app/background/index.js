var sow = require('./sowForTab');
var MartyStore = require('./stores/martyStore')
var ActionStore = require('./stores/actionStore');
var connectionHub = require('./stateSources/connectionHub');
var ActionActionCreators = require('./actions/actionActionCreators');
var MartyActionCreators = require('./actions/martyActionCreators');

var devtools = connectionHub.devtools;
var inspectedWindow = connectionHub.inspectedWindow;

inspectedWindow.onMessage(function (tabId, message) {
  switch (message.type) {
    case 'ACTION_DISPATCHED':
      ActionActionCreators.processDispatchedAction(tabId, message.payload.action);
      break;
    case 'MARTY_FOUND':
      MartyActionCreators.martyFoundInTab(tabId);
      break;
    default:
      console.log('Unknown message', message.type);
      break;
  }
});

devtools.onMessage(function (message) {
  if (message.type === 'INITIALIZE') {
    devtools.send(message.tabId, {
      type: 'SOW',
      payload: sow(message.tabId)
    });
  }
});

MartyStore.addChangeListener(function (state, store, tabId) {
  devtools.send(tabId, {
    type: 'MARTY_FOUND',
    payload: true
  });
});

ActionStore.addChangeListener(function (state, store, action) {
  devtools.send(action.tabId, {
    type: 'UPSERT_ACTION',
    payload: action
  });
});