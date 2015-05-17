var Marty = require('marty');
var sowForTab = require('../sow');
var PageConstants = require('../constants/pageConstants');

var PageActionCreators = Marty.createActionCreators({
  id: 'Page',
  pageLoaded: function (tabId, sow) {
    this.dispatch(PageConstants.PAGE_LOADED, tabId, sow);
    this.connections.Devtools.send(tabId, {
      type: 'PAGE_LOADED',
      payload: sowForTab(tabId)
    });
  },
  pageUnloaded: function (tabId) {
    this.dispatch(PageConstants.PAGE_UNLOADED, tabId);
    this.connections.Devtools.send(tabId, {
      type: 'PAGE_UNLOADED'
    });
  }
});

module.exports = PageActionCreators;