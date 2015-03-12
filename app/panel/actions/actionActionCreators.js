var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  toggleAction: autoDispatch(ActionConstants.TOGGLE_ACTION),
  clearActions: autoDispatch(ActionConstants.CLEAR_ACTIONS),
  upsertAction: autoDispatch(ActionConstants.UPSERT_ACTION),
  unselectAllActions: autoDispatch(ActionConstants.UNSELECT_ALL_ACTIONS)
});

module.exports = ActionActionCreators;