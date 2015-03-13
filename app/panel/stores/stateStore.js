var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');

var StateStore = Marty.createStore({
  id: 'StateStore',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    addDispatchedAction: ActionConstants.ACTION_DISPATCHED
  },
  getInitialState() {
    return { };
  },
  addDispatchedAction(dispatch) {
    this.state[dispatch.id] = dispatch.state;
  },
  pageLoaded(sow, connection) {
    this.state.connection = connection;
  }
});

module.exports = StateStore;