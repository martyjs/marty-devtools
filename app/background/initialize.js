var PageActionCreators = require('./actions/pageActionCreators');
var ActionActionCreators = require('./actions/actionActionCreators');
var DispatchActionCreators = require('./actions/dispatchActionCreators');
var DevtoolsActionCreators = require('./actions/devtoolsActionCreators');

function initialize(connections) {
  PageActionCreators.connections = connections;
  DispatchActionCreators.connections = connections;
  DevtoolsActionCreators.connections = connections;

  connections.InspectedWindow.onMessage(function (tabId, message) {
    switch (message.type) {
      case 'RECEIVE_DISPATCH':
        DispatchActionCreators.receiveDispatch(tabId, message.payload);
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

  connections.Devtools.onMessage(function (message) {
    switch (message.type) {
      case 'LOADED':
        DevtoolsActionCreators.devtoolsLoaded(message.tabId);
        break;
      case 'REVERT_TO_ACTION':
        ActionActionCreators.revertToAction(message.actionId);
      default:
        console.log('Unknown message from devtools', message.type);
        break;
    }
  });
}

module.exports = initialize;