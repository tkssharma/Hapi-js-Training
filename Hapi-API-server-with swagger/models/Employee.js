'use strict';
/**
 * Student Model
 **/
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 bcrypt = require('bcrypt'),
 moment = require('moment');

 var employeeSchema = new Schema({
  firstName   : String,
  lastName    : String,
  email       : {
    type      : String, 
    unique    : true,
    lowercase : true,
    required  : true
  },
  gender      : {
    type      : String, 
    enum      : ['female', 'male']
  },
  google      : {
    id        : String,
    token     : String
  },
  twitter      : {
    id        : String,
    token     : String
  },
  address     : {
    street    : {
      type    : String, 
      trim    : true
    },
    city      : {
      type    : String, 
      trim    : true
    },
    state     : String,
    zipcode   : String,
  },
  phone       : String,
  isVerified  : String,
  password    : String,
  company      : {
    type      : Schema.Types.ObjectId, 
    ref       : 'Company' 
  },
  track       : String,
  projects   : [{
    project  : {
      type  : Schema.Types.ObjectId, 
      ref   : 'Project' 
    },
    status  : {
      type  : String, 
      enum  : ['active', 'completed', 'dropped']
    }
  }],
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

employeeSchema.virtual('fullName').get(function(){
  var fullName;

  if(this.firstName && this.lastName){
    fullName = this.firstName + ' ' + this.lastName;
  } 
  return fullName;
});

employeeSchema.virtual('created').get(function(){
  return moment(this.createdAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

employeeSchema.virtual('updated').get(function(){
  return moment(this.updatedAt.toISOString(), 'YYYY-MM-DDTHH:mm:ss.sssZ').format('MMMM Do YYYY, h:mm a');
});

employeeSchema.set('toObject', { virtuals: true });

/**
* Set Global Methods
**/

employeeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

employeeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
