var util = require('util');
var get_ip = require('ipware')().get_ip;

module.exports = function (req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,environment,appVersion,buildNumber');
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('IN URL:', req.url, req.path);
	console.log('Method:', req.method);
	console.log('Query:', req.query);
	console.log('IP :', remote_ip(req));
	console.log('BODY PARAMS :', util.format('%j', req.body));
	console.log('HEADER PARAMS :', util.format('%j', req.headers));
	console.log('---------------------------------------------------------------------');
	next();
};


function remote_ip(req) {
	var ip_info = get_ip(req);
	var ip = ip_info.clientIp;
	if (ip_info.clientIp.indexOf(':') > -1) {
		ip = '[' + ip_info.clientIp + ']';
	}
	return ip;
}; //remote_ip
