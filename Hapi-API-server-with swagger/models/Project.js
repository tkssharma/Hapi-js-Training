'use strict';

/**
 * projectSchema Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var projectSchema = new Schema({
  name        : {
    type      : String,
    required  : true
  },
  projectType  : {
    type      : String, 
    enum      : ['POC', 'INTERNAL', 'CLIENT', 'MAINTAINANCE'],
    required  : true
  },
  number      : {
    type      : String,
    required  : true,
    unique    : true
  },
  department  : {
    type      : String
  },
  units       : {
    type      : String, 
    default   : 1
  },
  approval    : {
    type      : Boolean,
    default   : false
  },
  description : {
    type      : String
  },
  employees    : [{
    type      :  Schema.Types.ObjectId, 
    ref       : 'Employee' 
  }],
  company      : {
    type      : Schema.Types.ObjectId, 
    ref       : 'Company' 
  },
  createdAt   : { 
    type      : Date, 
    default   : Date.now()
  },
  updatedAt   :  { 
    type      : Date, 
    default   : Date.now()
  }
});

/**
* Set Global Virtual Attributes
**/

projectSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

projectSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
