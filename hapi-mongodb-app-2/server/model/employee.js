'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var EmployeeSchema = new Schema({

  empId : { type: String, unique: true, required: true },
  /** 
    User Name. It can only contain string, is required field.
  */
  employeeName : { type: String, required: true },
  organisation : { type: String, required: false },
  skills : { type: String, required: false },
  experience : { type: String, required: false },
  dob : { type: String, required: false },
  technologies : { type: String, required: false },
  project : { type: String, required: false },

});

var employee = mongoose.model('employee', EmployeeSchema);

/** export schema */
module.exports = {
  Employee : employee
};