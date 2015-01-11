var Marty = require('marty');
var sowForTab = require('../sow');
var PageConstants = require('../constants/pageConstants');
var Devtools = require('../stateSources/connections').Devtools;

var PageActionCreators = Marty.createActionCreators({
  displayName: 'Page',
  pageLoaded: PageConstants.PAGE_LOADED(function (tabId, sow) {
    this.dispatch(tabId, sow);
    Devtools.send(tabId, {
      type: 'PAGE_LOADED',
      payload: sowForTab(tabId)
    });
  }),
  pageUnloaded: PageConstants.PAGE_UNLOADED(function (tabId) {
    this.dispatch(tabId);
    Devtools.send(tabId, {
      type: 'PAGE_UNLOADED'
    });
  })
});

module.exports = PageActionCreators;