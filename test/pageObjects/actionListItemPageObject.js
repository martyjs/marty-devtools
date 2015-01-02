/** @jsx React.DOM */

var PageObject = require('react-page-objects');

var ActionsListItemPageObject = PageObject.extend({
  elements: {
    type: PageObject,
    action: PageObject
  },
  click: function () {
    this.action.click();
  }
});

module.exports = ActionsListItemPageObject;