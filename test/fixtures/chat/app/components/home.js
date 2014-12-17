/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var ActionStore = Marty.Stores.Actions;
var MessagesStore = require('../stores/messageStore');
var MessageActionCreators = require('../actions/messageActionCreators');

var HomeState = Marty.createStateMixin({
  listenTo: [ActionStore, MessagesStore],
  getState: function () {
    return {
      actions: ActionStore.getAll(),
      messages: MessagesStore.getAll()
    };
  }
});

var Home = React.createClass({
  name: 'Home',
  mixins: [HomeState],
  render: function () {
    return (
      <div className="home">
        <button onClick={this.createAction}>Create action</button>
        <table className="actions">
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Handlers</th>
            </tr>
          </thead>
          <tbody>
            {this.state.actions.map(function (action) {
              return (
                <tr>
                  <td>{action.type}</td>
                  <td>{action.status}</td>
                  <th>
                    <div className="stores">
                      {action.handlers.map(function (storeHandler) {
                        return (
                          <div className="store">
                            store: {storeHandler.store}<br/>
                            handler: {storeHandler.name}<br/>
                            state before: {JSON.stringify(storeHandler.state.before, null, 3)}<br/>
                            state after: {JSON.stringify(storeHandler.state.after, null, 3)}<br/>

                            <div className="views">
                              {storeHandler.views.map(function (viewHandler) {
                                return (
                                  <div className="view">
                                    view: {viewHandler.name}<br/>
                                    state before: {JSON.stringify(viewHandler.state.before, null, 3)}<br/>
                                    state after: {JSON.stringify(viewHandler.state.after, null, 3)}<br/>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  createAction: function () {
    MessageActionCreators.sendMessage({
      id: _.uniqueId(),
      message: "Hello world"
    });
  }
});

module.exports = Home;