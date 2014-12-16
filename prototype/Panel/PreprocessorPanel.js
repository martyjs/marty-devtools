// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(function() {

  var results = document.querySelector('.results');

  // Create a connection to the background page
  var backgroundPageConnection = chrome.runtime.connect({
      name: "devtools-page"
  });

  backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
  });

  backgroundPageConnection.onMessage.addListener(function (message) {
    results.appendChild(createRow("action created"));
  });

})();


