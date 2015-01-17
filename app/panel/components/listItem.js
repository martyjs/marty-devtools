/** @jsx React.DOM */

var currentPosition;
var showAlt = false;
var React = require('react');
var _ = require('underscore');
var classSet = require('react/lib/cx');
var RemoteObject = WebInspector.RemoteObject;
var PopoverHelper = require('./popoverhelper');


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
      <li onClick={onClick} className={classes} ref='item'>
        {this.props.children}
        <i className='fa fa-angle-right'></i>
      </li>
    );
  },
  componentDidMount: function () {
    if (!this.props.popover) {
      return;
    }

    // this.popover = new PopoverHelper(
    //   this.getDOMNode(),
    //   this.getAnchor,
    //   this.queryObject
    // );

    // this.popover.setTimeout(500);
  },
  queryObject: function (element, cb) {
    var obj = RemoteObject.fromLocalObject(this.props.popover);

    cb(obj, false);
  },
  getAnchor: function () {
    if (!currentPosition) {
      return;
    }

    var element = this.getDOMNode();
    var bounds = element.getBoundingClientRect();

    return new AnchorBox(
      currentPosition.x,
      currentPosition.y,
      1,
      1
    );
  }
});

ListItem.reset = function () {
  showAlt = false;
};

module.exports = ListItem;