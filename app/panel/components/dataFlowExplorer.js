/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var ViewsColumn = require('./viewsColumn');
var SplitColumns = require('./splitColumns');
var ActionsColumn = require('./actionsColumn');
var StoreStore = require('../stores/storeStore');
var ActionStore = require('../stores/actionStore');
var HandlersColumn = require('./actionHandlersColumn');

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
      <div className='data-flow-explorer hbox fill columns'>
        <ActionsColumn ref="actions" actions={this.state.actions} />
        <HandlersColumn ref="handlers" action={this.state.selectedAction} />
        <ViewsColumn ref="views" actionHandler={this.state.selectedActionHandler} />
      </div>
    );
  }
});

module.exports = DataFlowExplorer;