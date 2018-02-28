/*

    Using Sequelize as out ORM framework
*/

'use strict';

var Sequelize = require('sequelize');

// Sequelize('database', 'username', 'password', {
var sq = new Sequelize('BOPO', 'root', 'pwd', {
	host: '127.0.0.1',
	//host: 'localhost',
	dialect: 'mysql', //|'sqlite'|'postgres'|'mssql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}

	// SQLite only
	//storage: 'path/to/database.sqlite'
});
//connection.connect(function(err){
//	if(err) throw err;
//})
//module.exports =connection;
// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// Test
sq.authenticate()
	.then(function (err) {
		console.log('Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});

module.exports = sq;
