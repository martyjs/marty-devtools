/** @jsx React.DOM */

var _ = require('underscore');
var PageObject = require('react-page-objects');

module.exports = function (ItemPageObject) {
  return PageObject.extend({
    elements: {
      items: [ItemPageObject]
    }
  });
};