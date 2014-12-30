/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');

var ObjectTree = React.createClass({
  render: function () {
    return <div className='object-tree resource-headers-view'></div>
  },
  componentDidMount: function () {
    this.renderTree();
  },
  componentDidUpdate: function () {
    this.renderTree();
  },
  renderTree: function () {
    var obj = this.props.object;
    var node = this.getDOMNode();

    if (!obj) {
      return;
    }

    node.removeChildren();

    var listElement = document.createElement("ol");
    listElement.className = "outline-disclosure";
    node.appendChild(listElement);

    var treeOutline = new TreeOutline(listElement);
    treeOutline.expandTreeElementsWhenArrowing = true;

    _.each(obj, function (value, name) {
      var valueElement = new TreeElement("", null, false);
      valueElement.selectable = false;
      valueElement.title = this.formatHeader(name, value);
      treeOutline.appendChild(valueElement);
    }, this);
  },
  formatHeader: function(name, value) {
    var fragment = document.createDocumentFragment();
    fragment.createChild("div", "header-name").textContent = name + ":";
    fragment.createChild("div", "header-value source-code").textContent = value;
    return fragment;
  },
});

module.exports = ObjectTree;