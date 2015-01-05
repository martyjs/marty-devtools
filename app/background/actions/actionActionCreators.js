var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  clearActions: ActionConstants.CLEAR_ACTIONS(),
  processDispatchedAction: ActionConstants.PROCESS_DISPATCHED_ACTION()
});

module.exports = ActionActionCreators;