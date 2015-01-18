/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');

var ViewListItem = React.createClass({
  render: function () {
    var view = this.props.view;

    return (
      <ListItem
        popover={view}
        onClick={this.onClick}
        active={view.selected}
        className='view-list-item'>
        <div ref='nane' className='view-list-item-name'>{view.name}</div>
      </ListItem>
    );
  },
  onClick: function () {
  }
});

module.exports = ViewListItem;