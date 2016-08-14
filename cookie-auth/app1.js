app1.jsvar Hapi = require('hapi')  
var CookieAuth = require('hapi-auth-cookie')

// create new server instance
var server = new Hapi.Server()

// register plugins to server instance
server.register(CookieAuth, function (err) {

  server.auth.strategy('session', 'cookie', options) // your TODO: options -> there are required ones

  // start your server after plugin registration
  server.start(function (err) {
    console.log('info', 'Server running at: ' + server.info.uri)
  })
})


server.route({  
  method: 'GET',
  path: '/private-route',
  config: {
    auth: 'session',
    handler: function (request, reply) {
      reply('Yeah! This message is only available for authenticated users!')
    }
  }
})