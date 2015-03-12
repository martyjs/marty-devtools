var Marty = require('marty');
var ActionsStore = require('../stores/actionStore');
var ActionConstants = require('../constants/actionConstants');
var Devtools = require('../stateSources/connections').Devtools;

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  upsertAction: function (tabId, action) {
    this.dispatch(ActionConstants.UPSERT_ACTION, tabId, action);

    Devtools.send(tabId, {
      type: 'UPSERT_ACTION',
      payload: action
    });
  }
});

module.exports = ActionActionCreators;