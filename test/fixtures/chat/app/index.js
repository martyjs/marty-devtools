/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var Router = require('./router');
var Diagnostics = require('marty/diagnostics');

window.React = React; // For React DevTools
window.Marty = Marty;

Diagnostics.enabled = true;

if (process.env.NODE_ENV !== 'test') {
  Router.run(function (Handler, state) {
    React.render(<Handler {...state.params} />, document.getElementById('app'));
  });
}