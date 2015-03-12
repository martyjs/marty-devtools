var React = require('react');
var Marty = require('marty');
var ActionDetails = require('./actionDetails');
var ActionsColumn = require('./actionsColumn');
var StoreStore = require('../stores/storeStore');
var ActionStore = require('../stores/actionStore');

var DataFlowExplorerState = Marty.createStateMixin({
  listenTo: [ActionStore, StoreStore],
  getState: function () {
    return {
      actions: ActionStore.getAll(),
      selectedAction: ActionStore.getSelectedAction()
    };
  }
});

var DataFlowExplorer = React.createClass({
  mixins: [DataFlowExplorerState],
  render: function () {
    return (
      <div className='data-flow-explorer hbox fill columns'>
        <ActionsColumn ref="actions" actions={this.state.actions} />
        <ActionDetails ref="details" action={this.state.selectedAction} />
      </div>
    );
  }
});

module.exports = DataFlowExplorer;