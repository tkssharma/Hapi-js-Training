// Load modules

var User      = require('./controller/employee'),
Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

{ method: 'GET',  path: '/{somethingss*}', config: Static.get },
{ method: 'POST', path: '/employee', config: User.create},
{ method: 'GET', path: '/employee', config: User.getAll},
{ method: 'GET', path: '/employee/{empId}', config: User.getOne},
{ method: 'PUT', path: '/employee/{empId}', config: User.update},
{ method: 'DELETE', path: '/employee/{empId}', config: User.remove},
{ method: 'DELETE', path: '/employee', config: User.removeAll},
{ method: 'GET', path: '/', config: User.index},
{
	method : 'GET', path : '/public/{path*}', handler : {
		directory : {
			path : './public',
			listing : false,
			index : false
		}
	}
},
{
	method : 'GET',
	path : '/employees',
	config : User.employees
},
{
	method : 'GET',
	path : '/user-management/groups',
	config : User.user_management
},
{
	method : 'GET',
	path : '/user-management/users',
	config : User.user_management_users
},
{
	method : 'GET',
	path : '/documents',
	config : User.documents
}

];