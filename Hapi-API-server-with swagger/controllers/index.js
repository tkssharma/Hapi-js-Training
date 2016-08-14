'use strict';
/**
 * main Controllers
 **/
var employee = require('./employeeCtrl'),
    company = require('./companyCtrl'),
    project = require('./projectCtrl'),
    authLocal = require('./authLocal');
module.exports = {
  employee: employee,
  company: company,
  project: project,
  authLocal : authLocal
};