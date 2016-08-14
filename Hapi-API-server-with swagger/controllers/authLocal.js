'use strict';

/**
 * Project Controller
 **/

 var Employee = require('../models/Employee'),
 _ = require('underscore'),
 Boom = require('boom'),
 Common = require('./mailer'),
 Config = require('../config/config'),
 Jwt = require('jsonwebtoken');

 module.exports = {
    create: function(request, reply){
        request.payload.password = Common.encrypt(request.payload.password);
        var employee = request.payload;
        Employee.create(employee, function(err, employee){
            if (!err) {
                var tokenData = {
                    firstName: employee.firstName,
                    id: employee._id
                };
                var privateKey = Config.key.privateKey;
                Common.sentMailVerificationLink(employee,Jwt.sign(tokenData, privateKey));
                reply("Please confirm your email id by clicking on link in email");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"));
                } else reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    },
    signin: function(request, reply){
        Employee.findOne({'email': request.payload.email},function(err, employee) {
            if (!err) {
                if (employee === null) return reply(Boom.forbidden("invalid username or password"));
                if (request.payload.password === Common.decrypt(employee.password)) {

                    if(!employee.isVerified) return reply("Your email address is not verified. please verify your email address to proceed");

                    var tokenData = {
                        firstName: employee.firstName,
                        id: employee._id
                    };
                    var res = {
                        username: employee.firstName,
                        token: Jwt.sign(tokenData, privateKey)
                    };

                    reply(res);
                } else reply(Boom.forbidden("invalid username or password"));
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"));
                } else {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                } 
            }
        });
    },
    resendVerificationEmail: function(request, reply){
        Employee.findOne({'email': request.payload.email},function(err, employee) {
            if (!err) {
                if (user === null) return reply(Boom.forbidden("invalid username or password"));
                if (request.payload.password === Common.decrypt(employee.password)) {

                    if(employee.isVerified) return reply("your email address is already verified");

                    var tokenData = {
                        firstName: employee.firstName,
                        id: employee._id
                    };
                    Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
                    reply("account verification link is sucessfully send to an email id");
                } else reply(Boom.forbidden("invalid username or password"));
            } else {                
                console.error(err);
                return reply(Boom.badImplementation(err));
            }
        });
    },
    forgotPassword: function(request, reply){
        Employee.findOne({'email': request.payload.email},function(err, employee) {
            if (!err) {
                if (employee === null) return reply(Boom.forbidden("invalid username"));
                Common.sentMailForgotPassword(employee);
                reply("password is send to registered email id");
            } else {       
                console.error(err);
                return reply(Boom.badImplementation(err));
            }
        });
    },
    verifyEmail: function(request, reply){
        Jwt.verify(request.headers.authorization.split(" ")[1], privateKey, function(err, decoded) {
            if(decoded === undefined) return reply(Boom.forbidden("invalid verification link"));
            Employee.findUserByIdAndUserName(decoded.id, decoded.userName, function(err, user){
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                if (user === null) return reply(Boom.forbidden("invalid verification link"));
                if (user.isVerified === true) return reply(Boom.forbidden("account is already verified"));
                user.isVerified = true;
                User.updateUser(user, function(err, user){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply("account sucessfully verified");

                })
            })

        });
    }
};