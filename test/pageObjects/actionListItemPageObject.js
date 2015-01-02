/** @jsx React.DOM */

var PageObject = require('react-page-objects');
var TextPageObject = require('./textPageObject');

var ActionsListItemPageObject = PageObject.extend({
  elements: {
    type: TextPageObject,
    action: TextPageObject
  },
  click: function () {
    this.action.click();
  }
});

module.exports = ActionsListItemPageObject;