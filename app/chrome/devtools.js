// var backgroundPageConnection = chrome.runtime.connect({
//     name: 'marty-devtools'
// });

// backgroundPageConnection.postMessage({
//     name: 'init',
//     tabId: chrome.devtools.inspectedWindow.tabId
// });

// backgroundPageConnection.onMessage.addListener(function (message) {
//   results.appendChild(createRow('action created'));
// });


chrome.devtools.panels.create('Marty', null, 'app/index.html');