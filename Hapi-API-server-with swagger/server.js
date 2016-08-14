'use strict';

var Hapi = require('hapi'),
    Good = require('good'),
    Path = require('path'),
    Bell = require('bell'),
    HapiMongoose = require('hapi-mongoose-db-connector'),
    AuthCookie = require('hapi-auth-cookie'),
    pgk = require('./package.json');

var auth = require('./authCredentials');
/**
 * Server Config
 **/
var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      },
      cors: {
        origin: ['*'],
        headers: ['X-Requested-With', 'Content-Type']
      },
      payload: {
        maxBytes: 10 * 1024 * 1024 // 10MB
      }
    }
  }
});
server.connection({port: 5000});
/**
 * Plugins
 **/
  //Setup the social Twitter login strategy
  // configure document using hapi-swagger
server.register([
  {register: require('hapi-swagger'),
    options: {
      apiVersion: pgk.version,
      pathPrefixSize: 3
    }
  },
  // register HapiMongoose db connector 
  {register: HapiMongoose,
    options: {
      mongodbUrl: 'mongodb://localhost:27017/hapi-degree'
    }
  },
  {register: Bell},
  {register: AuthCookie},
  {register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', response: '*' }]
      }]
    }
  }
], function (err) {
  if(err) {
    throw err;
  }
 //Setup the social google login strategy
 server.auth.strategy('google', 'bell', {
    provider: 'google',
    cookie: 'sid-ex-degree',
    password: auth.Google.password,
    isSecure: false,
    clientId: auth.Google.clientID,
    clientSecret: auth.Google.clientSecret,
    providerParams: {
      redirect_uri: server.info.uri + auth.Google.callbackURL
    }
  });
    //Setup the session strategy
  server.auth.strategy('session', 'cookie', {
    password: 'secret_cookie_encryption_password', //Use something more secure in production
    redirectTo: '/', //If there is no session, redirect here
    isSecure: false //Should be set to true (which is the default) in production
  });
    
  //Setup the social Twitter login strategy
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: auth.twitter.password, //Use something more secure in production
    clientId: auth.twitter.clientID,
    clientSecret: auth.twitter.clientSecret,
    isSecure: false //Should be set to true (which is the default) in production
  });
  /**
   * Start Server
   **/
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});

/**
 * Views
 **/

server.views({
  engines: {
      html: require('handlebars')
  },
  isCached : false,
  path: Path.join(__dirname, '/public/templates')
});

/**
 * Routes
 **/

// Authentication Routes
server.route(require('./routes/auth'));
// API Routes
server.route(require('./routes/api'));

server.route(require('./routes/localauth'));
// Serve Static Directory
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'Resourcify'),
      listing: true
    }
  }
});

