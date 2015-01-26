var Marty = require('marty');
var StoreConstants = require('../constants/storeConstants');
var Devtools = require('../stateSources/connections').Devtools;

var StoreActionCreators = Marty.createActionCreators({
  displayName: 'Stores',
  upsertStore: StoreConstants.UPSERT_STORE(function (tabId, store) {
    this.dispatch(tabId, store);
    Devtools.send(tabId, {
      type: 'UPSERT_STORE',
      payload: store
    });
  }, { silent: true })
});

module.exports = StoreActionCreators;