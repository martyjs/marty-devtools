var fs = require('fs');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var Marty = require('marty');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var connections = require('./connections');
var initializeBackgroundApp = require('../background/initialize');

var app = express();
var port = process.env.PORT || 7070;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var version = require('../../package.json').version;

Marty.warnings.callingResolverOnServer = false;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);

app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, '..', '..','dist')));
app.use('/blink', express.static(path.join(__dirname, '..', '..', 'blink')));
app.use('/styles', express.static(path.join(__dirname, '..', 'panel', 'styles')));
app.use('/chrome', express.static(path.join(__dirname, '..', '..', 'app/panel/chrome')));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/messages', function (req, res) {
  connections.InspectedWindow.receiveMessage(parseInt(req.query.port), req.body);
  res.status(200).end();
});

initializeBackgroundApp(connections);

io.on('connection', function(socket) {
  var port = parseInt(socket.request._query.port);
  connections.Devtools.onConnect(port, socket);
});

console.log('Marty DevTools v' + version + '\nVisit http://localhost:' + port + ' to start debugging');

server.listen(port);