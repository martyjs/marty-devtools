/** @jsx React.DOM */

var PageObject = require('react-page-objects');
var Home = require('../../app/components/home');

var HomePageObject = PageObject.extend({
  getComponent: function (params) {
    return <Home {...params} />;
  }
});

module.exports = HomePageObject;