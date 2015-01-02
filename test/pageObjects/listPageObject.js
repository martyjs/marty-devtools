/** @jsx React.DOM */

var _ = require('underscore');
var PageObject = require('react-page-objects');

module.exports = function (ItemPageObject) {
  return PageObject.extend({
    elements: {
      items: function (ref, name) {
        return _.map(ref._renderedChildren, item);

        function item(element) {
          var element = _.values(element._renderedChildren)[0];

          if (element) {
            return new ItemPageObject(element);
          }
        }
      }
    }
  });
};