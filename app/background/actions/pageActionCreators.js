var Marty = require('marty');
var sowForTab = require('../sow');
var PageConstants = require('../constants/pageConstants');
var Devtools = require('../stateSources/connections').Devtools;

var PageActionCreators = Marty.createActionCreators({
  displayName: 'Page',
  pageLoaded: function (tabId, sow) {
    this.dispatch(PageConstants.PAGE_LOADED, tabId, sow);
    Devtools.send(tabId, {
      type: 'PAGE_LOADED',
      payload: sowForTab(tabId)
    });
  },
  pageUnloaded: function (tabId) {
    this.dispatch(PageConstants.PAGE_UNLOADED, tabId);
    Devtools.send(tabId, {
      type: 'PAGE_UNLOADED'
    });
  }
});

module.exports = PageActionCreators;