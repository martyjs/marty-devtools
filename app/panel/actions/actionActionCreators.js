var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var DispatchStore = require('../stores/dispatchStore');
var ConnectionStore = require('../stores/connectionStore');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  id: 'ActionActionCreators',
  toggleAction: autoDispatch(ActionConstants.TOGGLE_ACTION),
  clearActions: autoDispatch(ActionConstants.CLEAR_ACTIONS),
  unselectAllActions: autoDispatch(ActionConstants.UNSELECT_ALL_ACTIONS),
  revertToAction: function (actionId) {
    var dispatch = DispatchStore.getDispatchForAction(actionId);
    var connection = ConnectionStore.getConnection();

    this.dispatch(ActionConstants.REVERT_TO_ACTION, actionId);

    connection.postMessage({
      actionId: actionId,
      type: 'REVERT_TO_ACTION',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    if (!dispatch) {
      console.error('Could not find dispatch for action', actionId);
      return;
    }

    try {
      var code = `window.Marty.rehydrate(${JSON.stringify(dispatch.stores)})`;

      console.log(code);
      chrome.devtools.inspectedWindow.eval(code);
    } catch (e) {
      console.error('Failed to evaluate code', e.stack);
    }
  }
});

module.exports = ActionActionCreators;