var Marty = require('marty');
var ActionsStore = require('../stores/actionStore');
var ActionConstants = require('../constants/actionConstants');
var Devtools = require('../stateSources/connections').Devtools;

var ActionActionCreators = Marty.createActionCreators({
  displayName: 'Actions',
  upsertAction: ActionConstants.UPSERT_ACTION(function (tabId, action) {
    this.dispatch(tabId, action);

    var actionId = action.arguments[0].id;
    var subject = ActionsStore.getActionById(actionId);

    if (subject) {
      Devtools.send(tabId, {
        type: 'UPSERT_ACTION',
        payload: subject
      });
    }
  }, { silent: true })
});

module.exports = ActionActionCreators;