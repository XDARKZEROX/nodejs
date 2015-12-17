function route(handle, pathname, response, request) {
	console.log("A punto de enrutar una solicitud para " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("No se halló ningun controlador de solicitud para " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;