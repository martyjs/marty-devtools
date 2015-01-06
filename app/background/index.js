var sow = require('./sowForTab');
var MartyStore = require('./stores/martyStore');
var StoreStore = require('./stores/storeStore');
var ActionStore = require('./stores/actionStore');
var connectionHub = require('./stateSources/connectionHub');
var StoreActionCreators = require('./actions/storeActionCreators');
var MartyActionCreators = require('./actions/martyActionCreators');
var ActionActionCreators = require('./actions/actionActionCreators');

var devtools = connectionHub.devtools;
var inspectedWindow = connectionHub.inspectedWindow;

inspectedWindow.onMessage(function (tabId, message) {
  switch (message.type) {
    case 'STORE_CHANGED':
      StoreActionCreators.upsertStore(tabId, message.payload);
      break;
    case 'ACTION_DISPATCHED':
      ActionActionCreators.upsertAction(tabId, message.payload);
      break;
    case 'MARTY_FOUND':
      MartyActionCreators.martyFoundInTab(tabId);
      break;
    case 'PAGE_UNLOADED':
      ActionActionCreators.clearActions(tabId);
      devtools.send(tabId, {
        type: 'CLEAR_ACTIONS'
      });
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

StoreStore.addChangeListener(function (state, store, store) {
  devtools.send(store.tabId, {
    type: 'UPSERT_STORE',
    payload: store
  });
});

MartyStore.addChangeListener(function (state, store, tabId) {
  devtools.send(tabId, {
    type: 'MARTY_FOUND',
    payload: true
  });
});

ActionStore.addChangeListener(function (state, store, action) {
  if (!action) {
    return;
  }

  devtools.send(action.tabId, {
    type: 'UPSERT_ACTION',
    payload: action
  });
});