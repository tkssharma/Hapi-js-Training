
'use strict';
/**
 * API Routes
 **/
 var Joi = require('joi'),
 ctrl = require('../controllers');

 var apiRoutes = [
  
  { // Employees
    method: 'POST',
    path: '/api/v1.1/employee',
    config: {
      handler: ctrl.authLocal.create,
      description: 'Creates a Employee or Register Employee',
      tags: ['api', 'employee'],
      validate: {
        payload: {
          firstName: Joi.string().trim().min(3).max(100).required(),
          password: Joi.string().trim().min(3).max(20).required(),
          lastName: Joi.string().trim().min(3).max(100),
          email: Joi.string().email().trim().required(),
          isVerified : Joi.string(),
          gender: Joi.string().valid('female', 'male'),
          google: {
            token: Joi.string().token(),
            id: Joi.string().alphanum()
          },
          twitter: {
            token: Joi.string().token(),
            id: Joi.string().alphanum()
          },
          address: {
            street: Joi.string().trim().min(20).max(150),
            city: Joi.string().trim().min(3).max(50),
            state: Joi.string().trim().length(2),
            zipcode: Joi.string().trim().length(5)
          },
          phone: Joi.string(),
          projects: Joi.array().includes(
            Joi.object().keys({
              project: Joi.string().alphanum(),
              section: Joi.string().trim().min(3).max(50),
              status: Joi.string().valid('active', 'completed', 'dropped'),
              grade: Joi.string().trim().min(1).max(4),
            })
            )
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 201, message: 'Created' },
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },
  { // Login Employees
    method: 'POST',
    path: '/api/v1.1/signin',
    config: {
      handler: ctrl.authLocal.signin,
      description: 'Validate & Login  Employee',
      tags: ['api', 'employee'],
      validate: {
        payload: {
          password: Joi.string().trim().min(3).max(20).required(),
          email: Joi.string().email().trim().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 201, message: 'Created' },
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },
  { // resend email for employee 
    method: 'POST',
    path: '/api/v1.1/resendEmail',
    config: {
      handler: ctrl.authLocal.resendVerificationEmail,
      description: 'resend Email request',
      tags: ['api', 'employee'],
      validate: {
        payload: {
          password: Joi.string().trim().min(3).max(20).required(),
          email: Joi.string().email().trim().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 201, message: 'Created' },
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },
  { // forgotPassword functionality Employees
    method: 'POST',
    path: '/api/v1.1/forgotPassword',
    config: {
      handler: ctrl.authLocal.forgotPassword,
      description: 'forgotPassword request based on email',
      tags: ['api', 'employee'],
      validate: {
        payload: {
          email: Joi.string().email().trim().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 201, message: 'Created' },
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },
  { // Login Employees
    method: 'POST',
    path: '/api/v1.1/verifyEmail',
    config: {
      handler: ctrl.authLocal.verifyEmail,
      description: 'verifyEmail before login to Account',
      tags: ['api', 'employee'],
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 201, message: 'Created' },
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  }]

    module.exports = apiRoutes;