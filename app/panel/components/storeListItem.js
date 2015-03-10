/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var ListItem = require('./listItem');
var classSet = require('react/lib/cx');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.handler;
    var storeDisplayName = handler.store.displayName || handler.store.id;
    var id = storeDisplayName + '#' + handler.displayName;
    var classes = classSet({
      'action-handler-list-item': true,
      'has-children': handler.views.length
    });

    return (
      <ListItem
        className={classes}
        onClick={this.onClick}
        active={handler.selected}
        popover={popoverHandler(handler)}>
        <div ref='id' className='action-handler-id'>{id}</div>
      </ListItem>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleActionHandler(this.props.action.id, this.props.handler.id);
  }
});

function popoverHandler(handler) {
  var popover = _.pick(handler, 'id', 'store', 'state');

  popover['action handler'] = handler.name;

  if (handler.error) {
    popover.error = handler.error;
  }

  return popover;
}


module.exports = ActionHandlerListItem;