'use strict';

/**
 * Employee Controller
 **/

var Employee = require('../models/Employee');
var Boom = require('boom');
module.exports = {

  create: function(request, reply){
    var employee = request.payload;

    Employee.create(employee, function(err, newEmployee){
      if(err){
        return reply(Boom.badImplementation(err)); 
      } else {
        var employeeObj = newEmployee.toObject();
        return reply(employeeObj).code(201);
      }
    });
  },
  findById: function(request, reply){
    var id = request.params.id;

    Employee.findById(id).exec(function(err, employee){
      if(err){
        return reply(Boom.badImplementation(err)); 
      } else if(!employee){
        return reply('employee Not Found').code(404);
      } else {
        var employeeObj = employee.toObject();
        return reply(employeeObj).code(200);
      }
    });
  },
  findByEmail: function(request, reply){
    var email = request.query.email.toLowerCase();

    Employee.findOne({'email': email}).exec(function(err, employee){
      if(err){
         return reply(Boom.badImplementation(err)); 
      } else if(!employee){
        return reply('employee Not Found').code(404);
      } else {
        var employeeObj = employee.toObject();
        return reply(employeeObj).code(200);
      }
    });
  },

  updateById: function(request, reply){
    var id = request.params.id,
        employee = request.payload;
        
    employee.updatedAt = Date.now();
  
    Employee.findByIdAndUpdate(id, employee).exec(function(err, updatedEmployee){
      if(err){
         return reply(Boom.badImplementation(err)); 
      } else if(!updatedEmployee){
        return reply('Employee Not Found').code(404);
      } else {
        var employeeObj = updatedEmployee.toObject();
        return reply(employeeObj).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;
  
    Employee.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
         return reply(Boom.badImplementation(err)); 
      } else if(!removed){
        return reply('Employee Not Found').code(404);
      } else {
        return  reply('company removed successfully').code(200);
      }
    });
  },


};