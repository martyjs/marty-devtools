var _ = require('lodash');
var Marty = require('marty');
var MessageHttpAPI = require('../apis/messageHttpApi');
var MessageConstants = require('../constants/messageConstants');

var MessageStore = Marty.createStore({
  displayName: 'messages',
  handlers: {
    addMessage: MessageConstants.ADD_MESSAGE
  },
  getInitialState: function () {
    return {};
  },
  addMessage: function (message) {
    this.state[message.id] = message;
    this.hasChanged();
  },
  getAll: function () {
    return _.values(this.state);
  },
  getById: function (id) {
    return this.fetch(id,
      function () {
        return this.state[id];
      },
      function () {
        return MessageHttpAPI.getById(id);
      }
    );
  }
});

module.exports = MessageStore;