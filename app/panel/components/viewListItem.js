/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var ListItem = require('./listItem');

var ViewListItem = React.createClass({
  render: function () {
    var view = this.props.view;

    return (
      <ListItem
        active={view.selected}
        className='view-list-item'
        popover={popoverView(view)}>
        <div ref='nane' className='view-list-item-name'>{view.name}</div>
      </ListItem>
    );
  }
});

function popoverView(view) {
  var popover = _.pick(view, 'id', 'state');

  popover['view'] = view.name;

  if (view.error) {
    popover.error = view.error;
  }

  return popover;
}

module.exports = ViewListItem;