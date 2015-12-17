var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response) {
	
	var body = '<!DOCTYPE html><html>'+
	 '<head>'+
	 '<meta http-equiv="Content-Type" content="text/html; '+
	 'charset=UTF-8" />'+
	 '</head>'+
	 '<body>'+
	 '<span>PRIMER FORMULARIO EN NODE</span>' +
	 '<form action="/upload" method="post" enctype="multipart/form-data">' +
	 '<div><label for="name">Name:</label>' +
     '<input type="text" name="name" /></div>' +
     '<input type="file" name="upload">'+
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

function upload(response, request) {
	if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
		var form = new formidable.IncomingForm();
		console.log(form);


		form.parse(request, function(error, fields, files) {
		
		/* Posible error en sistemas Windows:
		intento de cambiar el nombre a un archivo ya existente*/ 
		var readStream=fs.createReadStream(files.upload.path);
        var writeStream=fs.createWriteStream("/tmp/test.png");
        readStream.pipe(writeStream);
        readStream.on('end',function(){
    		fs.unlink(files.upload.path);
		});


		/*fs.rename(files.upload.path, "/tmp", function(error) {

			if (error) {
				console.log(error);
				//fs.unlink("/tmp/test.png");
				//fs.rename(files.upload.path, "/tmp/test.png");
			}
		});*/
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
		
		});

	}
}

function show(response) {
	console.log("Controlador de solicitud 'show' se ha llamado.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
