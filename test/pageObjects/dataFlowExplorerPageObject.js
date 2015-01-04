/** @jsx React.DOM */

var PageObject = require('react-page-objects');
var ActionsColumnPageObject = require('./actionsColumnPageObject');
var DataFlowExplorer = require('../../app/panel/components/dataFlowExplorer');

var DataFlowExplorerPageObject = PageObject.extend({
  elements: {
    actions: ActionsColumnPageObject
  },
  getComponent: function (props) {
    return <DataFlowExplorer {...props} />;
  }
});

module.exports = DataFlowExplorerPageObject;