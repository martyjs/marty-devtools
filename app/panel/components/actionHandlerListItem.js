/** @jsx React.DOM */

var React = require('react');
var ListItem = require('./listItem');
var classSet = require('react/lib/cx');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.handler;
    var id = handler.store + '#' + handler.name;
    var classes = classSet({
      'action-handler-list-item': true,
      'has-children': handler.views.length
    });

    return (
      <ListItem
        popover={handler}
        className={classes}
        onClick={this.onClick}
        active={handler.selected}>
        <div ref='id' className='action-handler-id'>{id}</div>
      </ListItem>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleActionHandler(this.props.action.id, this.props.handler.id);
  }
});

module.exports = ActionHandlerListItem;