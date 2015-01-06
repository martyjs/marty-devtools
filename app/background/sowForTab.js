var MartyStore = require('./stores/martyStore');
var StoreStore = require('./stores/storeStore');
var ActionStore = require('./stores/actionStore');

function sowForTab(tabId) {
  return {
    stores: StoreStore.getStoresForTab(tabId),
    actions: ActionStore.getActionsForTab(tabId),
    martyFound: MartyStore.hasMartyBeenFound(tabId)
  };
}

module.exports = sowForTab;