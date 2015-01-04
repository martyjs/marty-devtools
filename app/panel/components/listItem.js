/** @jsx React.DOM */

var showAlt = false;
var React = require('react');
var classSet = require('react/lib/cx');

var ListItem = React.createClass({
  render: function () {
    showAlt = !showAlt;
    var classes = classSet({
      'list-item': true,
      'alt': showAlt,
      'active': this.props.active
    });

    if (this.props.className) {
      classes += (' ' + this.props.className);
    }

    var onClick = this.props.onClick || function () {};

    return <li onClick={onClick} className={classes} ref='item'>{this.props.children}</li>;
  }
});

ListItem.reset = function () {
  showAlt = false;
};

module.exports = ListItem;