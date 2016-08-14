Hapi-App
========================

The purpose of this app is to show a new way to work with Hapi.js, Mongodb, Mongoose

## The Goal:

Create a base boilerplate dashboard app, with seperate GUI and API server processes. Quick development of RESTful Resource api endpoints.

## The Stack:

**Node.js** - Because it's fast, easy to get started, and Javscript is awesome.
[http://nodejs.org/](http://nodejs.org/)

**Hapi** - A very well designed server framework that is easy to understand, easy to create your own plugins, scales very well, cache options built in, and more.
[http://hapijs.com/](http://hapijs.com/)

**Mongo** - A great NoSQL database that handles JSON natively, perfect fit for Node.js projects.
[http://www.mongodb.org/](http://www.mongodb.org/)

### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

cd server; 
npm install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

node server.js

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file

Test url on browser to render intial .html from routes 

http://localhost:8080/

### *API Available*

```Javascript

     keep this same as conflict may occur with diff version

    "boom": "^2.6.1",
    "hapi": "^8.2.0",
    "joi": "^5.1.0",
    "mongoose": "3.8.23",
    "lite-server" : "*",
    "good": "^6.6.3",
    "good-console": "^5.1.0",
    "handlebars": "^4.0.3",
    "hapi-cache-buster": "~0.4.0",
    "inert": "^3.2.1",
    "path": "^0.12.7",
    "vision": "^3.0.0"

     // Route API
	{ method: 'GET',  path: '/{*}', config: Static.get },
	{ method: 'POST', path: '/employee', config: User.create},
	{ method: 'GET', path: '/employee', config: User.getAll},
	{ method: 'GET', path: '/employee/{empId}', config: User.getOne},
	{ method: 'PUT', path: '/employee/{empId}', config: User.update},
	{ method: 'DELETE', path: '/employee/{empId}', config: User.remove},
	{ method: 'DELETE', path: '/employee', config: User.removeAll},

```

### *Creating HAPI Server*

```Javascript

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
	 server.start(function(){
	 	console.log("Server running on", server.info.uri);
	 });
});

```


