var Marty = require('marty');

var ActionActionCreators = Marty.createActionCreators({
  toggleAction: function (actionId) {
    this.dispatch(actionId);
  },
  toggleActionHandler: function (actionId, actionHandlerId) {
    this.dispatch(actionId, actionHandlerId);
  }
});

module.exports = ActionActionCreators;