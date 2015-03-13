var MartyStore = require('./stores/martyStore');
var DispatchStore = require('./stores/dispatchStore');

function sow(tabId) {
  return {
    dispatches: DispatchStore.getDispatchesForTab(tabId),
    martyFound: MartyStore.hasMartyBeenFoundInTab(tabId)
  };
}

module.exports = sow;