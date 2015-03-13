var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var ConnectionStore = require('../stores/connectionStore');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  toggleAction: autoDispatch(ActionConstants.TOGGLE_ACTION),
  clearActions: autoDispatch(ActionConstants.CLEAR_ACTIONS),
  actionDispatched: autoDispatch(ActionConstants.ACTION_DISPATCHED),
  unselectAllActions: autoDispatch(ActionConstants.UNSELECT_ALL_ACTIONS),
  revertToAction: function (actionId) {
    this.dispatch(ActionConstants.REVERT_TO_ACTION, actionId);

    ConnectionStore.postMessage({
      actionId: actionId,
      type: 'REVERT_TO_ACTION'
    });
  }
});

module.exports = ActionActionCreators;