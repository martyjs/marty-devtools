/** @jsx React.DOM */

var React = require('react');
var ActionList = require('./actionList');
var ObjectTree = require('./objectTree');

var ViewHandlerListItem = React.createClass({
  render: function () {
    var handler = this.props.item;
    return (
      <span>
        {handler.store}#{handler.name}
      </span>
    );
  }
});

var ActionHandlerPanel = React.createClass({
  render: function () {
    var actionHandler = this.props.actionHandler;

    return (
      <div className='action-handler action-list-container'>
        <ObjectTree object={actionHandler} />
        <ActionList
          className='view-handlers'
          template={ViewHandlerListItem}
          items={actionHandler.views}
          onClick={this.onClickViewHandler} />
      </div>
    );
  },
  onClickViewHandler: function () {
  }
});

module.exports = ActionHandlerPanel;