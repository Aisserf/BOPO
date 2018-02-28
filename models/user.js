/*
    Model objekt, a user of the site
	  For simple way of debug see below.

*/

var Sequelize = require('sequelize');
var sequelize = require('../db/home_db_orm.js');

var UserRegistry = sequelize.define('user_registry', {
  name: {
    type: Sequelize.STRING
  },
  userid: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});

/*
//HÄR ÄR JOACHIMS KOD UTAN DATABAS SOM FUNKAR
*/

// Constructor
function User(name, userid, email, password) {
    this.name = name;
    this.userid = userid;
    this.email = email;
    this.password = password;
};

User.prototype = (function() {
    return {
        // emails unique id!
        equals: function(other) {
            return this.email === other.email;
        }
    }

})();

module.exports = {User: User, UserRegistry: UserRegistry};

/*
	Simple way to debug using node-debug
	Install
	$ npm install -g node-debug

	Run
	node-debug user.js  (will open browser, like Chrome debugger)

	or just run
	$ node models/user.js

*/
/*var test = function () {

	var u1 = new User("", "", "email");
	var u2 = new User("", "", "otheremail");
	var u3 = new User("", "", "email");
	console.log(!u1.equals(u2));
	console.log(u1.equals(u3));

}();*/
