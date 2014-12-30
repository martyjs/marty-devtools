var Marty = require('marty');
var MessageConstants = require('../constants/messageConstants');

var MessageServerActionCreators = Marty.createActionCreators({
  addMessage: MessageConstants.ADD_MESSAGE(function (message) {
    this.dispatch(message);
  })
});

module.exports = MessageServerActionCreators;