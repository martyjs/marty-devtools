var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  toggleAction: ActionConstants.TOGGLE_ACTION(),
  clearActions: ActionConstants.CLEAR_ACTIONS(),
  toggleActionHandler: ActionConstants.TOGGLE_ACTION_HANDLER(),
  upsertAction: ActionConstants.UPSERT_ACTION(function (action) {
    this.dispatch(action);
  })
});

module.exports = ActionActionCreators;