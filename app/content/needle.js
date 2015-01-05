// var version = '0.7.2';

window.addEventListener('beforeunload', onUnload);
window.addEventListener('message', onMessageFromPage);

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.extension.getURL('app/content/martyObserver.js');
script.onload = function () {
  script.parentNode.removeChild(script);
};
document.documentElement.appendChild(script);

function onUnload() {
  chrome.runtime.sendMessage({
    type: 'PAGE_UNLOADED'
  });
}

function onMessageFromPage(event) {
  if (event && event.source !== window) {
    return;
  }

  var message = event.data;

  if (typeof message !== 'object' || message === null || message.source !== 'marty-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
}