'use strict';

/**
 * company Controller
 **/
 var Company = require('../models/Company'),
 _ = require('underscore'),
 Boom = require('boom'),
 Common = require('./mailer'),
 Config = require('../config/config'),
 Jwt = require('jsonwebtoken');
 var Boom = require('boom');

 module.exports = {

  create: function(request, reply){
    var company = request.payload;

    Company.create(company, function(err, newComapny){
      if(err){
        return reply(Boom.badImplementation(err)); 

      } else {
        var companyObj = newComapny.toObject();
        return reply(companyObj).code(201);
      }
    });
  },
  findById: function(request, reply){
    var id = request.params.id;

    Company.findById({_id:id}).exec(function(err, company){
      if(err){
        return reply(Boom.badImplementation(err)); 
      } else if(!company){
        return reply('company Not Found').code(404);
      } else {
        var companyObj = company.toObject();
        return reply(companyObj).code(200);
      }
    });
  },

  findByName: function(request, reply){
    var name = request.query.name;
    var query ;

    if(name){
      query = {'name': name};
    } else {
      query = {};
    }
    
    Company.find(query).exec(function(err, companies){
      if(err){
        return reply(Boom.badImplementation(err)); 
      } else if(!companies){
        return reply('Company Not Found').code(404);
      } else {
        var allcompany = [];
        _.each(companies, function(company){
          allcompany.push(company.toObject());
        })
        return reply(allcompany).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
    company = request.payload;

    company.updatedAt = Date.now();
    
    Company.findByIdAndUpdate(id, company).exec(function(err, updatedcompany){
      if(err){
       return reply(Boom.badImplementation(err)); 
     } else if(!updatedcompany){
      return reply('company Not Found').code(404);
    } else {
      var companyObj = updatedcompany.toObject();
      return reply(companyObj).code(200);
    }
  });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;

    Company.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(Boom.badImplementation(err));  
      } else if(!removed){
        return reply(Boom.badRequest('data not found for id'+id));
      } else {
        return  reply('company removed successfully').code(200);
      }
    });
  },


};