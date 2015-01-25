/** @jsx React.DOM */

var currentPosition;
var showAlt = false;
var React = require('react');
var _ = require('underscore');
var classSet = require('react/lib/cx');
var RemoteObject = WebInspector.RemoteObject;
var PopoverHelper = require('./popoverHelper');

var POPOVER_DELAY = 1000;

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

    return (
      <li
        ref='item'
        className={classes}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}>
        {this.props.children}
        <i className='fa fa-angle-right'></i>
      </li>
    );
  },
  onClick: function () {
    this.clearTimeout();

    if (this.props.onClick) {
      this.props.onClick.apply(null, arguments);
    }
  },
  onMouseEnter: function (e) {
    if (!this.props.popover) {
      return;
    }
    this.clearTimeout();
    this.popoverTimeout = setTimeout(_.partial(this.showPopover, e), POPOVER_DELAY);
  },
  onMouseLeave: function () {
    this.clearTimeout();
  },
  showPopover: function (e) {
    this.clearTimeout();
    this.popover = new PopoverHelper(
      this.getDOMNode(),
      this.getAnchor,
      this.queryObject
    );
    this.popover.setTimeout(0);
    this.popover._handleMouseAction(e);
    this.popover.setTimeout(POPOVER_DELAY);
  },
  clearTimeout: function () {
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }

    delete this.popoverTimeout;
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