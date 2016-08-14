'use strict';
/**
 * Project Controller
 **/
 var Project = require('../models/Project'),
 _ = require('underscore');
 var Boom = require('boom');

 module.exports = {

  create: function(request, reply){
    var project = request.payload;
    console.log(project);
    Project.create(project, function(err, newProject){
      if(err){
       return reply(Boom.badRequest())
     } else {
      var projectObj = newProject.toObject();
      return reply(projectObj).code(201);
    }
  });
  },

  findById: function(request, reply){
    var id = request.params.id;

    Project.findById(id).exec(function(err, project){
      if(err){
       return reply(Boom.badRequest())
     } else if(!project){
      return reply('project Not Found').code(404);
    } else {
      var projectObj = project.toObject();
      return reply(projectObj).code(200);
    }
  });
  },
  findByName: function(request, reply){
    var name = request.query.name,
    query;
    if(name){
      query = {'name': name};
    } else {
      query = {};
    }
    Project.find(query).exec(function(err, projects){
      if(err){
       return reply(Boom.badRequest())
     } else if(!projects){
      return reply('projects  Not Found').code(404);
    } else {
      var allProjects = [];
      _.each(projects, function(project){
        allProjects.push(project.toObject());
      })
      return reply(allProjects).code(200);
    }
  });
  },

  updateById: function(request, reply){
    var id = request.params.id,
    course = request.payload;

    course.updatedAt = Date.now();
    
    Course.findByIdAndUpdate(id, course).exec(function(err, updatedCourse){
      if(err){
        return reply(Boom.badRequest())
      } else if(!updatedCourse){
        return reply('Course Not Found').code(404);
      } else {
        var courseObj = updatedCourse.toObject();
        return reply(courseObj).code(200);
      }
    });
  },

  hardDelete: function(request, reply){
    var id = request.params.id;

    Course.findByIdAndRemove(id).exec(function(err, removed){
      if(err){
        return reply(Boom.badRequest())
      } else if(!removed){
        return reply('Course Not Found').code(404);
      } else {
        return reply().code(204);
      }
    });
  }


};