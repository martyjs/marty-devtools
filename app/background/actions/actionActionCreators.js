var Marty = require('marty');
var ActionConstants = require('../constants/actionConstants');

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'ActionActionCreators',
  revertToAction: function (tabId, actionId) {
    this.dispatch(ActionConstants.REVERT_TO_ACTION, tabId, actionId);
  }
});

module.exports = ActionActionCreators;