var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');

var ConnectionStore = Marty.createStore({
  id: 'ConnectionStore',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED
  },
  getInitialState() {
    return {
      connection: null
    };
  },
  getConnection() {
    return this.state.connection;
  },
  pageLoaded(sow, connection) {
    this.state.connection = connection;
  }
});

module.exports = ConnectionStore;