var MartyStore = require('./stores/martyStore');
var ActionStore = require('./stores/actionStore');

function sowForTab(tabId) {
  return {
    actions: ActionStore.getActionsForTab(tabId),
    martyFound: MartyStore.hasMartyBeenFound(tabId)
  };
}

module.exports = sowForTab;