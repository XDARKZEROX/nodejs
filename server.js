//Primera aplicacion de prueba con Node

var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(handle, pathname, response, request);
	}
	http.createServer(onRequest).listen(5000);
	console.log("Servidor ha comenzado.");
}

exports.start = start;
