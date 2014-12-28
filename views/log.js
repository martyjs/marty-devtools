var _log = console.log;

console.log = function (text) {
  var message = document.createElement("div");
  message.className = "message";
  message.textContent = text;
  document.getElementById("log").appendChild(message);
}