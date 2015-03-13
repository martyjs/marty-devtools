var COLUMNS_KEY = 'columns';
var _ = require('lodash');
var JSONStateSource = require('./jsonStateSource');

module.exports = new JSONStateSource({
  key: COLUMNS_KEY,
  deserialize: function (str) {
    var json = JSON.parse(str);

    _.each(json, function (value, key) {
      json[key] = parseInt(value);
    });

    return json;
  }
});