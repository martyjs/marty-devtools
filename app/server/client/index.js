var initialized = false;
var connection = require('./backgroundConnection');

connection.on('PAGE_LOADED', onPageLoaded);
connection.open();

function onPageLoaded(sow) {
  if (initialized) {
    return;
  }

  initialized = true;
  window.initialize({
    sow: sow,
    connection: connection
  });
}