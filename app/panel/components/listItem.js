var showAlt = false;
var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');

var ListItem = React.createClass({
  render: function () {
    showAlt = !showAlt;
    var classes = classNames({
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