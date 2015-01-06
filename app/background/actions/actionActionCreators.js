var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  clearActions: ActionConstants.CLEAR_ACTIONS(),
  upsertAction: ActionConstants.UPSERT_ACTION()
});

module.exports = ActionActionCreators;