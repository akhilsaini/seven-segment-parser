var config = require('config');
var EE = require('eventemitter3');
var eventEmitter = new EE();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var http = require('http');

var app = express();
app.use(cookieParser('xxxx'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.em = eventEmitter;
eventEmitter.app = app;

app.use(require('./modules/middlewares/generic_middleware'));

var routes = require('./routes');
app.use(routes);

var SP = new (require('./modules/segment_parser'))(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	console.log('Error in : ',err);
	res.status(err.status || 500);
	var result = {
		'success': '0',
		'message': {}
	};
	res.json(result);
});

var http_port = config.get('app.port');

var http_server = http.createServer(app);
http_server.listen(http_port);
http_server.on('error', onError);
http_server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof http_port === 'string'
    ? 'Pipe ' + http_port
    : 'Port ' + http_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = http_server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


module.exports = app;
