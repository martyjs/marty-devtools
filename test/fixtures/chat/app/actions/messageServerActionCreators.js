var Marty = require('marty');

var MessageServerActionCreators = Marty.createActionCreators({
  addMessage: function (message) {
    this.dispatch(message);
  }
});

module.exports = MessageServerActionCreators;