
'use strict';
/**
 * API Routes
 **/
 var Joi = require('joi'),
 ctrl = require('../controllers');

 var apiRoutes = [
  // HTTP GET for getting employee based on ID
  {
    method: 'GET',
    path: '/api/v1.1/employee/{id}',
    config: {
      handler: ctrl.employee.findById,
      description: 'Finds a Employee by Employee id',
      tags: ['api', 'employee'],
      validate: {
        params: {
          // id is required to enter 
          id: Joi.string().alphanum().required()
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: {
          firstName: Joi.string().trim().min(3).max(100),
          lastName: Joi.string().trim().min(3).max(100),
          email: Joi.string().email().trim().required(),
          gender: Joi.string().valid('female', 'male'),
          google: {
            token: Joi.string(),
            id: Joi.string().alphanum()
          },
           twitter: {
            token: Joi.string(),
            id: Joi.string().alphanum()
          },
          address: {
            street: Joi.string().trim().min(20).max(150),
            city: Joi.string().trim().min(3).max(50),
            state: Joi.string().trim().length(2),
            zipcode: Joi.string().trim().length(5)
          },
          phone: Joi.string().trim().length(10),
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
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Employee Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    //  // HTTP PUT for updating employee based on ID
    method: 'PUT',
    path: '/api/v1.1/employee/{id}',
    config: {
      handler: ctrl.employee.updateById,
      description: 'Updates a Employee',
      tags: ['api', 'employee'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          firstName: Joi.string().trim().min(3).max(100),
          lastName: Joi.string().trim().min(3).max(100),
          email: Joi.string().email().trim(),
          gender: Joi.string().valid('female', 'male'),
          google: {
            token: Joi.string().token(),
            id: Joi.string().alphanum()
          },
           twitter: {
            token: Joi.string(),
            id: Joi.string().alphanum()
          },
          address: {
            street: Joi.string().trim().min(20).max(150),
            city: Joi.string().trim().min(3).max(50),
            state: Joi.string().trim().length(2),
            zipcode: Joi.string().trim().length(5)
          },
          phone: Joi.string().trim().length(10),
          track: Joi.string().trim().min(3).max(50),
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
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Employee Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/api/v1.1/employee/{id}',
    config: {
      handler: ctrl.employee.hardDelete,
      description: 'Permanently deletes a Employee',
      tags: ['api', 'employee'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Employee Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{ // Projects
    method: 'POST',
    path: '/api/v1.1/project',
    config: {
      handler: ctrl.project.create,
      description: 'Creates a Project',
      tags: ['api', 'project'],
      validate: {
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          projectType: Joi.string().valid('POC', 'INTERNAL', 'CLIENT', 'MAINTAINANCE'),
          number: Joi.string().trim().min(1).max(10),
          department: Joi.string().trim().min(3).max(100),
          units: Joi.number().precision(1).required(),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(500)
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
  },{
    method: 'GET',
    path: '/api/v1.1/project/{id}',
    config: {
      handler: ctrl.project.findById,
      description: 'Finds a Course by id',
      tags: ['api', 'courses'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: {
          name: Joi.string().trim().min(3).max(100).required(),
          projectType: Joi.string().valid('POC', 'INTERNAL', 'CLIENT', 'MAINTAINANCE'),
          number: Joi.string().trim().min(3).max(10),
          department: Joi.string().trim().min(3).max(100),
          units: Joi.number().precision(1).required(),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(500)
        }
      },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Project Not Found' },
            { code: 500, message: 'Internal Server Error'}
            ]
          }
      }
    }
  },{
    method: 'GET',
    path: '/api/v1.1/project',
    config: {
      handler: ctrl.project.findByName,
      description: 'Finds all Projects or one by number|name query',
      tags: ['api', 'project'],
      validate: {
        query: {
          name: Joi.string().trim().min(3).max(100)
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
         schema: {
          name: Joi.string().trim().min(3).max(100).required(),
          projectType: Joi.string().valid('POC', 'INTERNAL', 'CLIENT', 'MAINTAINANCE'),
          number: Joi.string().trim().min(3).max(10),
          department: Joi.string().trim().min(3).max(100),
          units: Joi.number().precision(1).required(),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(500)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Project Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/api/v1.1/project/{id}',
    config: {
      handler: ctrl.project.updateById,
      description: 'Updates a Project',
      tags: ['api', 'project'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          projectType: Joi.string().valid('POC', 'INTERNAL', 'CLIENT', 'MAINTAINANCE'),
          number: Joi.string().trim().min(3).max(10),
          department: Joi.string().trim().min(3).max(100),
          units: Joi.number().precision(1).required(),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(500)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Project Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/api/v1.1/project/{id}',
    config: {
      handler: ctrl.project.hardDelete,
      description: 'Permanently deletes a Project',
      tags: ['api', 'project'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Project Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/api/v1.1/company/{id}',
    config: {
      handler: ctrl.company.findById,
      description: 'Finds a Company by id',
      tags: ['api', 'company'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: {
          name: Joi.string().trim().min(2).max(50).required(),
          description: Joi.string().trim().min(40).max(500)
          
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/api/v1.1/company',
    config: {
      handler: ctrl.company.findByName,
      description: 'Finds all Companys or one by name|degree query',
      tags: ['api', 'company'],
      validate: {
        query: {
          name: Joi.string().trim().min(3).max(50)
        }
      },
      response: {
        options: {
          allowUnknown: true
        },
        schema: Joi.array().single().includes(
          Joi.object().keys({
            name: Joi.string().trim().min(2).max(50).required(),
            description: Joi.string().trim().min(40).max(500)
            
          })
          )
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/api/v1.1/company/{id}',
    config: {
      handler: ctrl.company.updateById,
      description: 'Updates a Company',
      tags: ['api', 'company'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          name: Joi.string().trim().min(2).max(50),
          description: Joi.string().trim().min(40).max(500)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/api/v1.1/company/{id}',
    config: {
      handler: ctrl.company.hardDelete,
      description: 'Permanently deletes a Company',
      tags: ['api', 'company'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
          { code: 200, message: 'OK' },
          { code: 400, message: 'Bad Request' },
          { code: 404, message: 'Company Not Found' },
          { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  }
  ];

  module.exports = apiRoutes;
