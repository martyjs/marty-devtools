var Marty = require('marty');
var StoreConstants = require('../constants/storeConstants');

var StoreActionCreators = Marty.createActionCreators({
  upsertStore: StoreConstants.UPSERT_STORE()
});

module.exports = StoreActionCreators;