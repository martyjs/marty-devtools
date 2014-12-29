var backgroundPageConnection = chrome.runtime.connect({
  name: "marty-devtools"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});


try {
  WebInspector.installPortStyles();

  var panel = new MartyPanel();
  panel.markAsRoot();
  panel.show(document.getElementById('main-panel-holder'));

} catch (e) {
  console.log("ERROR:" + e);
}