var Marty = require('marty');
var ActionsStore = require('../stores/actionStore');
var ActionConstants = require('../constants/actionConstants');
var Devtools = require('../stateSources/connections').Devtools;

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  actionDispatched: function (tabId, dispatch) {
    this.dispatch(ActionConstants.ACTION_DISPATCHED, tabId, dispatch);

    Devtools.send(tabId, {
      type: 'ACTION_DISPATCHED',
      payload: dispatch
    });
  }
});

module.exports = ActionActionCreators;