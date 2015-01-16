/** @jsx React.DOM */

var showAlt = false;
var React = require('react');
var classSet = require('react/lib/cx');
var RemoteObject = WebInspector.RemoteObject;

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
  },
  componentDidMount: function () {
    if (!this.props.popover) {
      return;
    }

    this.popover = new WebInspector.ObjectPopoverHelper(
      this.getDOMNode(),
      this.getAnchor,
      this.queryObject
    );

    this.popover.setTimeout(0);
  },
  queryObject: function (element, cb) {
    var obj = RemoteObject.fromLocalObject(this.props.popover);

    cb(obj, false);
  },
  getAnchor: function () {
    var element = this.getDOMNode();
    var bounds = element.getBoundingClientRect();

    return new AnchorBox(
      bounds.left,
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