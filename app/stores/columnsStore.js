var DEFAULT_WIDTH = 300;
var Marty = require('marty');
var ColumnConstants = require('../constants/columnConstants');
var ColumnsStateSource = require('../stateSources/columnsStateSource');

var ColumnsStore = Marty.createStore({
  displayName: 'Columns',
  handlers: {
    updateColumnWidth: ColumnConstants.UPDATE_COLUMN_WIDTH
  },
  getInitialState: function () {
    return ColumnsStateSource.get();
  },
  updateColumnWidth: function (columnId, width) {
    ColumnsStateSource.set(columnId, width);
    this.state[columnId] = width;
    this.hasChanged();
  },
  getColumnWidth: function (columnId) {
    return this.state[columnId] || DEFAULT_WIDTH;
  }
});

module.exports = ColumnsStore;