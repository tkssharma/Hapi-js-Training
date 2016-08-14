'use strict';

/**
 * API Routes
 **/
var Employee = require('../models/Employee');
var authRoutes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      plugins: {
        'hapi-auth-cookie': { redirectTo: false }
      },
      handler: function(request, reply) {
        return reply.file('../Resourcify/index.html');
      }
    }
  },{
    method: 'GET',
    path: '/auth/google',
    config: {
      auth: 'google',
      handler: function(request, reply) {
        var account = request.auth.credentials,
            token = account.token;
        var profile = {
          firstName: account.profile.name.first,
          lastName: account.profile.name.last,
          email: account.profile.email,
          picture: account.profile.raw.picture,
          gender: account.profile.raw.gender || 'undisclosed',
          google: {
            token: token,
            id: account.profile.id,
          }
        };

        if(!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        } else {
          Employee.findOne({'email': profile.email}).exec(function(err, student){
            if(err){
              console.log(err);
            } else if(!student){
              Employee.create(profile, function(err, newEmployee){
                if(err){
                  console.log(err);
                }
                request.auth.session.clear();
                request.auth.session.set({token: token, user: profile});
                return reply.redirect('/');
              });
            } else {
              request.auth.session.clear();
              request.auth.session.set({token: token, user: profile});
              return reply.redirect('/');
            }
          });
        }
      },
      description: 'Social auth using google',
      tags: ['api', 'employee'],
    }
  },{
    method: 'GET',
    path: '/auth/twitter',
    config: {
      auth: 'twitter', //<-- use our twitter strategy and let bell take over
      handler: function(request, reply) {
        if(!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        } else {
          Employee.findOne({'email': profile.email}).exec(function(err, employee){
            if(err){
              console.log(err);
            } else if(!employee){
              Employee.create(profile, function(err, newEmployee){
                if(err){
                  console.log(err);
                }
                request.auth.session.clear();
                request.auth.session.set({token: token, user: profile});
                return reply.redirect('/');
              });
            } else {
              request.auth.session.clear();
              request.auth.session.set({token: token, user: profile});
              return reply.redirect('/');
            }
          });
        }

        //Just store a part of the twitter profile information in the session as an example. You could do something
        //more useful here - like loading or setting up an account (social signup).
        const profile = request.auth.credentials.profile;

        request.cookieAuth.set({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName
        });

        return reply.redirect('/');
      },
       description: 'social auth using twitter',
      tags: ['api', 'employee'],
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        request.auth.session.clear();
        return reply.redirect('/');
      },
      description: 'logout session',
      tags: ['api', 'employee'],
    }
  },{
    method: 'GET',
    path: '/account',
    config: {
      auth: 'session',
      handler: function(request, reply) {
        Employee.findOne({'email': request.auth.credentials.email}).exec(function(err, student){
          if(err){
            console.log(err);
          } else {
            return reply.view('profile/view', {
              student: student,
              isLoggedIn: request.auth.isAuthenticated
            });
          }
        });
      },
      description: 'PostLogin updates ..',
      tags: ['api', 'employee'],
    }
  }
];

module.exports = authRoutes;
