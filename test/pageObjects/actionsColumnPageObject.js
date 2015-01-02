/** @jsx React.DOM */

var PageObject = require('react-page-objects');
var ListPageObject = require('./listPageObject');
var ActionsColumn = require('../../app/components/actionsColumn');
var ActionListItemPageObject = require('./actionListItemPageObject');

var ActionsColumnPageObject = PageObject.extend({
  elements: {
    list: ListPageObject(ActionListItemPageObject)
  },
  getComponent: function (props) {
    return <ActionsColumn actions={props.actions} />;
  }
});

module.exports = ActionsColumnPageObject;