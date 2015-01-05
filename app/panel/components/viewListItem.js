/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');

var ViewListItem = React.createClass({
  render: function () {
    var view = this.props.view;

    return (
      <ListItem className='view-list-item' active={view.selected} onClick={this.onClick}>
        <div ref='nane' className='view-list-item-name'>{view.name}</div>
      </ListItem>
    );
  },
  onClick: function () {
  }
});

module.exports = ViewListItem;