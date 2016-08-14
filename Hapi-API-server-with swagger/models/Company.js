'use strict';

/**
 * companySchema Model
 **/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var companySchema = new Schema({
  name        : {
    type      : String,
    required  : true
  },
  description : {
    type      : String
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

companySchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

companySchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

companySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Company', companySchema);
