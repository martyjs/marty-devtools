/** @jsx React.DOM */

var React = require('react');
var ActionActionCreators = require('../actions/actionActionCreators');

var ActionHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.handler;

    return (
      <div ref='item' className='action-handler-list-item' onClick={this.onClick}>
        {handler.store}#{handler.name}
      </div>
    );
  },
  onClick: function () {
    ActionActionCreators.toggleActionHandler(this.props.action.id, this.props.handler.id);
  }
});

module.exports = ActionHandlerListItem;