/** @jsx React.DOM */

var React = require('react');

var ViewListItem = React.createClass({
  render: function () {
    var view = this.props.view;
    return (
      <span>
        {view.store}#{view.name}
      </span>
    );
  }
});

module.exports = ViewListItem;