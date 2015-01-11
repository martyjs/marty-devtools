var MartyStore = require('./stores/martyStore');
var StoreStore = require('./stores/storeStore');
var ActionStore = require('./stores/actionStore');

function sow(tabId) {
  return {
    stores: StoreStore.getStoresForTab(tabId),
    actions: ActionStore.getActionsForTab(tabId),
    martyFound: MartyStore.hasMartyBeenFoundInTab(tabId)
  };
}

module.exports = sow;