var _ = require('lodash');
var Marty = require('marty');
var PageConstants = require('../constants/pageConstants');

var MartyStore = Marty.createStore({
  id: 'Marty',
  handlers: {
    pageLoaded: PageConstants.PAGE_LOADED
  },
  getInitialState: function () {
    return {};
  },
  hasMartyBeenFoundInTab: function (tabId) {
    return !!this.state[tabId];
  },
  pageLoaded: function (tabId, sow) {
    this.state[tabId] = sow.martyFound;
    this.hasChanged(tabId);
  }
});

module.exports = MartyStore;