/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var ActionsColumn = require('./actionsColumn');
var ActionStore = require('../stores/actionStore');

var DataFlowExplorerState = Marty.createStateMixin({
  listenTo: ActionStore,
  getState: function () {
    return {
      actions: ActionStore.getAll(),
      selectedAction: ActionStore.getSelectedAction(),
      selectedActionHandler: ActionStore.getSelectedActionHandler()
    };
  }
});

var DataFlowExplorer = React.createClass({
  mixins: [DataFlowExplorerState],
  render: function () {
    return (
      <div className='data-flow-explorer hbox fill'>
        <ActionsColumn ref="actions" actions={this.state.actions} />
      </div>
    );
  }
});

module.exports = DataFlowExplorer;