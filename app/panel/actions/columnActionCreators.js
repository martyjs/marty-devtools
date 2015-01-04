var Marty = require('marty');
var ColumnConstants = require('../constants/columnConstants');

var ColumnActionCreators = Marty.createActionCreators({
  displayName: 'Columns',
  updateColumnWidth: ColumnConstants.UPDATE_COLUMN_WIDTH()
});

module.exports = ColumnActionCreators;