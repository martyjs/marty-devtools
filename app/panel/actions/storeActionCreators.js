var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var StoreConstants = require('../constants/storeConstants');

var StoreActionCreators = Marty.createActionCreators({
  displayName: 'Stores',
  upsertStore: autoDispatch(StoreConstants.UPSERT_STORE)
});

module.exports = StoreActionCreators;