"use strict";

var http = require('http');
var soap = require('soap');

var helloService = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function(args) {
                console.log(args.firstName.$value);
                return {
                    greeting: "Hello!!!"+ " " + args.firstName.$value
                };
            }
        }
    }
};

var xml = require('fs').readFileSync('resources/globalweather.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url);
}).listen(5000);

//server.listen(5000);

soap.listen(server, '/wsdl', helloService, xml);