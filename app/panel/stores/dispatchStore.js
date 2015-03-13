var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');
var DispatchConstants = require('../constants/dispatchConstants');

var DispatchStore = Marty.createStore({
  id: 'DispatchStore',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED,
    recieveDispatch: DispatchConstants.RECEIVE_DISPATCH
  },
  getInitialState() {
    return { };
  },
  recieveDispatch(dispatch) {
    this.state[dispatch.id] = dispatch.state;
  },
  pageLoaded(sow) {
    this.state = sow.dispatches;
  }
});

module.exports = DispatchStore;