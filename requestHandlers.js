var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response, postData) {
	
	var body = '<!DOCTYPE html><html>'+
	 '<head>'+
	 '<meta http-equiv="Content-Type" content="text/html; '+
	 'charset=UTF-8" />'+
	 '</head>'+
	 '<body>'+
	 '<span>PRIMER FORMULARIO EN NODE</span>' +
	 '<form action="/upload" method="post">' +
	 '<div><label for="name">Name:</label>' +
     '<input type="text" name="name" /></div>' +
     '<div><label for="mail">E-mail:</label>' +
     '<input type="email" name="mail" /></div>' +
     '<div><label for="msg">Message:</label>' +
     '<textarea name="msg"></textarea></div>' +
	 '<div class="button">' +
     '<button type="submit">Send your message</button>' +
     '</div>' +
	 '</form>' +
	 '</body>' +
	 '</html>'; 

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Controlador de solicitud 'upload' se ha llamado.");
 	var rsp = querystring.parse(postData);
 	response.writeHead(200, {"Content-Type": "text/plain"});
 	response.write(rsp.name);
 	response.write(rsp.mail);
 	response.write(rsp.msg);
 	
 	response.end();
}

exports.start = start;
exports.upload = upload;