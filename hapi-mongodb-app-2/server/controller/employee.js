'use strict';

var Joi = require('joi'),
Boom = require('boom'),
Employee = require('../model/employee').Employee,
path = require('path'),
mongoose = require('mongoose');

// simple example to render ui 
exports.index = {
  handler: function (request, reply) {
   reply.view('home/home', {title : 'Home'});
 }
};
exports.documents = {
  handler: function (request, reply) {
   reply.view('employees/displayEmployees', {title:'docs'});
 }
};
exports.employees = {
  handler: function (request, reply) {
     Employee.find({}, function (err, employee) {
      if (!err) {
        return reply.view('employees/displayEmployees', {employee: employee});
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });

   
 }
};
exports.user_management = {
  handler: function (request, reply) {
   reply.view('user-management/users/displayUsers', {title:'Groups'});
 }
};

exports.user_management_users = {
  handler: function (request, reply) {
   reply.view('user-management/users/displayUsers', {title:'users'});
 }
};
exports.getAll = {
  handler: function (request, reply) {
    Employee.find({}, function (err, employee) {
      if (!err) {
        return reply(employee);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Employee.findOne({ 'empId': request.params.empId }, function (err, employee) {
      if (!err) {
        return reply(employee);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.create = {
  validate: {
    payload: {
      empId   : Joi.string().required(),
      employeeName  : Joi.string().required(),
      organisation  : Joi.string().required(),
      skills  : Joi.string().required(),
      experience  : Joi.string().required(),
      dob  : Joi.string().required(),
      technologies  : Joi.string().required(),
      project  : Joi.string().required()
    }
  },
  handler: function (request, reply) {

    var employee = new Employee(request.payload);

    employee.save(function (err, employee) {
      if (!err) {
        return reply(employee).created('/employee/' + employee._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another user id, it already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      empId  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    Employee.findOne({ 'empId': request.params.empId }, function (err, employee) {
      if (!err) {
        employee.employeeName = request.payload.employeeName;
        employee.save(function (err, employee) {
          if (!err) {
            return reply(employee); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another user id, it already exist"));
          }
          return reply(Boom.forbidden(err)); // HTTP 403
        });
      }
      else{ 
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};

exports.remove = {
  handler: function (request, reply) {
    Employee.findOne({ 'empId': request.params.empId }, function (err, employee) {
      if (!err && user) {
        employee.remove();
        return reply({ message: "Employee deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete user"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('employee', function (err, result) {
      if (!err) {
        return reply({ message: "Employee database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete user"));
    });
  }
};
