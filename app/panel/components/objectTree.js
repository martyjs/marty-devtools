/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var ObjectTree = React.createClass({
  render: function () {
    return <div className="outline-disclosure"/>;
  },
  componentDidMount: function () {
    this.updateObject(this.props.object);
  },
  componentWillUpdate: function (props) {
    this.updateObject(props.object);
  },
  updateObject: function (object) {
    var node = this.getDOMNode();
    node.removeChildren();

    if (!object || Object.keys(object).length === 0) {
      return;
    }

    _.each(object, function (props, key) {
      var section = new WebInspector.ObjectPropertiesSection(
        WebInspector.RemoteObject.fromLocalObject(props),
        key,
        '',
        'No ' + key.toLowerCase(),
        false,
        null
      );

      // section.headerElement.addStyleClass("hidden");
      section.expanded = true;
      section.editable = false;

      node.appendChild(section.element);
    });
  }
 });

module.exports = ObjectTree;