var MartyStore = require('./stores/martyStore');
var ActionStore = require('./stores/actionStore');

function sow(tabId) {
  return {
    actions: ActionStore.getActionsForTab(tabId),
    martyFound: MartyStore.hasMartyBeenFoundInTab(tabId)
  };
}

module.exports = sow;