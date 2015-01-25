var fs = require('fs');
var util = require('util');
var semver = require('semver');
var join = require('path').join;
var inc = process.env.inc || 'patch';
var version = semver.inc(require('../package.json').version, inc);

console.log(version);

['../manifest.json', '../package.json'].forEach(updateConfig);

function updateConfig(path) {
  var config = JSON.parse(read(path));
  config.version = version;
  write(path, JSON.stringify(config, null, 2));
}

function write(path, data) {
  fs.writeFileSync(join(__dirname, path), data);
}

function read(path) {
  return fs.readFileSync(join(__dirname, path), 'utf-8');
}