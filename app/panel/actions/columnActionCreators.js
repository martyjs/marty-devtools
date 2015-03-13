var Marty = require('marty');
var autoDispatch = require('marty/autoDispatch');
var ColumnConstants = require('../constants/columnConstants');

var ColumnActionCreators = Marty.createActionCreators({
  id: 'ColumnActionCreators',
  updateColumnWidth: autoDispatch(ColumnConstants.UPDATE_COLUMN_WIDTH)
});

module.exports = ColumnActionCreators;