var Hapi = require('hapi'),
Routes = require('./routes'),
Db = require('./config/db'),
Config = require('./config/config'),
Good = require('good');
var Path = require('path');

var app = {};
app.config = Config;

//For older version of hapi.js
//var server = Hapi.createServer(app.config.server.host, app.config.server.port, {cors: true});

var server = new Hapi.Server();

server.connection({ port: app.config.server.port });

//server.route(Routes.endpoints);
 server.views({
 	engines: { html: require('handlebars') },
 	layout : true,
 	path: __dirname + '/views',
		layoutPath : Path.join(__dirname, './views/layouts'), //setting Global Layout,
		partialsPath : Path.join(__dirname,'./views/layouts/partial') //partial Views
	});

 server.route(Routes.endpoints);

 server.register({

 	register : Good,
 	options : {

 		reporters : [{
 			reporter : require('good-console'),
 			events : {

 				response : '*',
 				log:'*'
 			}
 		}]
 	}

 }, function(error) {

 	if(error) {

 		throw error;
 	}

	/**
	 * Starting Server
	 */
	 server.start(function(){

	 	console.log("Server running on", server.info.uri);
	 });

	});

