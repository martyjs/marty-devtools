var Connections = require('./stateSources/connections');
var PageActionCreators = require('./actions/pageActionCreators');
var StoreActionCreators = require('./actions/storeActionCreators');
var ActionActionCreators = require('./actions/actionActionCreators');
var DevtoolsActionCreators = require('./actions/devtoolsActionCreators');

Connections.InspectedWindow.onMessage(function (tabId, message) {
  switch (message.type) {
    case 'STORE_CHANGED':
      StoreActionCreators.upsertStore(tabId, message.payload);
      break;
    case 'ACTION_DISPATCHED':
      ActionActionCreators.upsertAction(tabId, message.payload);
      break;
    case 'PAGE_LOADED':
      PageActionCreators.pageLoaded(tabId, message.payload);
      break;
    case 'PAGE_UNLOADED':
      PageActionCreators.pageUnloaded(tabId);
      break;
    default:
      console.log('Unknown message from inspected window', message.type);
      break;
  }
});

Connections.Devtools.onMessage(function (message) {
  switch (message.type) {
    case 'LOADED':
      DevtoolsActionCreators.devtoolsLoaded(message.tabId);
      break;
    default:
      console.log('Unknown message from devtools', message.type);
      break;
  }
});