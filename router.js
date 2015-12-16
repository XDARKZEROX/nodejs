function route(handle, pathname, response, postData) {
	console.log("A punto de enrutar una solicitud para " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log("No se halló ningun controlador de solicitud para " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;