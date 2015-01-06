/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var ObjectTree = React.createClass({
  render: function () {
    var object = this.props.object;

    return (
      <ul className="object-tree">
        {_.map(object, function (value, name) {
          return <ObjectTreeNode name={name} value={value} />;
        })}
      </ul>
    );
  }
});

var ObjectTreeNode = React.createClass({
  render: function () {
    var name = this.props.name;
    var value = this.props.value;

    return (
      <li className="object-tree-node">
        <span className="object-tree-node-name">{name}</span>
        <span className="object-tree-node-seperator">:</span>
        <span className="object-tree-node-value source-code">{value}</span>
      </li>
    );
  }
});

module.exports = ObjectTree;