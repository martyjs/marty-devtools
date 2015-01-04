function JSONStateSource(options) {
  var storage = window.localStorage;

  this.get = function () {
    var json = storage.getItem(options.key);
    var deserialize = options.deserialize || JSON.parse;

    return json ? deserialize(json) : {};
  };

  this.set = function (key, value) {
    var json = this.get();

    json[key] = value;

    storage.setItem(options.key, JSON.stringify(json));
  };

  this.reset = function () {
    storage.removeItem(options.key);
  };
}

module.exports = JSONStateSource;