var Hapi = require('hapi')  
var BasicAuth = require('hapi-auth-basic')

// create new server instance
var server = new Hapi.Server()

// register plugins to server instance
server.register(BasicAuth, function (err) {
  server.auth.strategy('simple', 'basic', { validateFunc: // TODO })
  // start your server after plugin registration
  server.start(function (err) {
    console.log('info', 'Server running at: ' + server.info.uri)
  })
})

  server.route({  
  method: 'GET',
  path: '/private-route',
  config: {
    auth: 'simple',
    handler: function (request, reply) {
      reply('Yeah! This message is only available for authenticated users!')
    }
  }
})