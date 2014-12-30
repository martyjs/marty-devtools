var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  toggleAction: ActionConstants.TOGGLE_ACTION(function (actionId) {
    this.dispatch(actionId);
  }),
  toggleActionHandler: ActionConstants.TOGGLE_ACTION_HANDLER(function (actionId, actionHandlerId) {
    this.dispatch(actionId, actionHandlerId);
  }),
  upsertAction: ActionConstants.UPSERT_ACTION(function (action) {
    this.dispatch(action);
  }),
  clearActions: ActionConstants.CLEAR_ACTIONS(function () {
    this.dispatch();
  })
});

module.exports = ActionActionCreators;