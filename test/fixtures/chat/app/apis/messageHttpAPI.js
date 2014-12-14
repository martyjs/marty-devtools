var Marty = require('marty');
var MessageServerActionCreators = require('../actions/messageServerActionCreators');

var MessageHttpAPI = Marty.createHttpAPI({
  getById: function (id) {
    return this.get('/api/messages/' + id).then(function (message) {
      return MessageServerActionCreators.addMessage(message);
    });
  }
});

module.exports = MessageHttpAPI;