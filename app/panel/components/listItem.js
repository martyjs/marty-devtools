/** @jsx React.DOM */

var currentPosition;
var showAlt = false;
var React = require('react');
var _ = require('underscore');
var classSet = require('react/lib/cx');
var RemoteObject = WebInspector.RemoteObject;
var PopoverHelper = require('./popoverHelper');

var POPOVER_DELAY = 500;

document.addEventListener('mousemove', function (e) {
  currentPosition = {
    x: e.clientX,
    y: e.clientY
  };
});

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

    return (
      <li
        ref='item'
        onClick={onClick}
        className={classes}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}>
        {this.props.children}
        <i className='fa fa-angle-right'></i>
      </li>
    );
  },
  onMouseOver: function (e) {
    if (!this.props.popover) {
      return;
    }
    this.mouseOver = true;
    this.clearTimeout();
    this.popoverTimeout = setTimeout(_.partial(this.showPopover, e), POPOVER_DELAY);
  },
  onMouseOut: function () {
    this.clearTimeout();
    this.mouseOver = false;

    if (this.popover) {
      this.popover.dispose();
      delete this.popover;
    }
  },
  showPopover: function (e) {
    if (!this.props.popover || !this.mouseOver) {
      return;
    }

    this.clearTimeout();
    this.popover = new PopoverHelper(
      this.getDOMNode(),
      this.getAnchor,
      this.queryObject
    );

    this.popover._handleMouseAction(e);
  },
  clearTimeout: function () {
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }

    this.popoverTimeout = null;
  },
  queryObject: function (element, cb) {
    var obj = RemoteObject.fromLocalObject(this.props.popover);

    cb(obj, false);
  },
  getAnchor: function () {
    var element = this.getDOMNode();
    var bounds = element.getBoundingClientRect();

    return new AnchorBox(
      currentPosition.x,
      bounds.top,
      bounds.width,
      bounds.height
    );
  }
});

ListItem.reset = function () {
  showAlt = false;
};

module.exports = ListItem;