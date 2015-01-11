/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var SplitColumns = require('./splitColumns');
var ActionsColumn = require('./actionsColumn');
var StoreStore = require('../stores/storeStore');
var ActionStore = require('../stores/actionStore');
var ActionHandlerColumn = require('./actionHandlerColumn');
var ActionHandlersColumn = require('./actionHandlersColumn');

var DataFlowExplorerState = Marty.createStateMixin({
  listenTo: [ActionStore, StoreStore],
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
        <SplitColumns>
          <ActionsColumn ref="actions" actions={this.state.actions} />
          <ActionHandlersColumn ref="actionHandlers" action={this.state.selectedAction} />
          <ActionHandlerColumn ref="actionHandler" actionHandler={this.state.selectedActionHandler} />
        </SplitColumns>
      </div>
    );
  }
});

module.exports = DataFlowExplorer;