var _ = require('lodash');
var Marty = require('marty');
var MartyConstants = require('../constants/martyConstants');

var MartyStore = Marty.createStore({
  displayName: 'Marty',
  handlers: {
    martyFoundInTab: MartyConstants.MARTY_FOUND_IN_TAB
  },
  hasMartyBeenFound: function (tabId) {
    return !!this.state[tabId];
  },
  martyFoundInTab: function (tabId) {
    this.state[tabId] = true;
    this.hasChanged(tabId);
  }
});

module.exports = MartyStore;