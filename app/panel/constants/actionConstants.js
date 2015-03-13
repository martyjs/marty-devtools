var Marty = require('marty');

var ActionConstants = Marty.createConstants([
  'ACTION_DISPATCHED',
  'TOGGLE_ACTION',
  'CLEAR_ACTIONS',
  'TOGGLE_VIEW_HANDLER',
  'UNSELECT_ALL_ACTIONS',
  'TOGGLE_ACTION_HANDLER',
  'REVERT_TO_ACTION'
]);

module.exports = ActionConstants;