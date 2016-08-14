var plugin = {
  register: function (server, options, next) {
    // filter/?name=tarun
    //filter/tarun
    var routes = [
      {
        method: 'GET',
        path: '/filter/{type}',
        handler: function (request, reply) {
          var params = request.params
          server.log('info', params)
          console.log(params.type);
          reply(params)
        }
      }
    ]

    // add defined routes to hapi
    server.route(routes)

    next()
  }
}

plugin.register.attributes = {
  name: 'path-params-optional-wildcard',
  version: '1.0.0'
}

module.exports = plugin