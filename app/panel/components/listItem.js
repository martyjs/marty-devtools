/** @jsx React.DOM */

var showAlt = false;
var React = require('react');
var _ = require('underscore');
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

    return (
      <li ref='item' className={classes} onClick={this.onClick}>
        {this.props.children}
        <i className='fa fa-angle-right'></i>
      </li>
    );
  },
  onClick: function () {
    if (this.props.onClick) {
      this.props.onClick.apply(null, arguments);
    }
  }
});

ListItem.reset = function () {
  showAlt = false;
};

module.exports = ListItem;