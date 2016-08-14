# Hapi js with Mongoose

# Three Principles

A rich framework for building applications and services
hapi enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

### Creating server 

```js
var Hapi = require('hapi')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
})

// add “hello world” route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello Future Studio!')
  }
})

// start your server
server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ' + server.info.uri)
})



```

### creating plugins

hapi has an extensive and powerful plugin system that allows you to very easily break your application up into isolated pieces of business logic, and reusable utilities.
Creating a plugin

Plugins are very simple to write. At their core they are an object with a register function that has the signature function (server, options, next). That register function then has an attributes object attached to it to provide hapi with some additional information about the plugin, such as name and version.

```js
var plugin = {
  register: function (server, options, next) {
    var routes = [
      {
        method: 'POST',
        path: '/',
        handler: function (request, reply) {
          var payload = request.payload
          server.log('info', payload)
          reply(payload)
        }
      }
    ]
    // add defined routes to hapi
    server.route(routes)
    next()
  }
}

plugin.register.attributes = {
  name: 'wildcard-path-params',
  version: '1.0.0'
}

module.exports = plugin
```

### Routes

When defining a route in hapi, as in other frameworks, you need three basic elements: the path, the method, and a handler. These are passed to your server as an object, and can be as simple as the following:

This route responds to a GET request to / with the string Hello!. The method option can be any valid HTTP method, or an array of methods. Let's say you want the same response when your user sends either a PUT or a POST request, you could do that with the following:

```Javascript

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello!');
    }
});
server.route({
    method: ['PUT', 'POST'],
    path: '/',
    handler: function (request, reply) {
        reply('I did something!');
    }
});

```
Contact
====================
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/MARTIN2.png" />](http://gennexttraining.herokuapp.com/)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/github.png" />](https://github.com/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/mail.png" />](mailto:tarun.softengg@gmail.com)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/linkedin.png" />](https://www.linkedin.com/in/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/twitter.png" />](https://twitter.com/tkssharma)