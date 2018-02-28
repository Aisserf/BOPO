/*
	 User registry model object
*/

var userModule = require('./user.js');

// private with some dummy data
var users = [new userModule.User("anon", "anon", "anon@mail.se", "anon")];
var sequelize = require('../db/home_db_orm.js');

// public (a singleton)
module.exports = {
    register: function(user) {
        console.log("About to add: " + user);
        var u = this.lookup(user);
        if (!u) {
          console.log("Adding user");
          sequelize.sync()
            .then(() => console.log("Sychronised to database"))
            .then(() => userModule.UserRegistry.create(user))
            .then(res => {
              console.log(res.toJSON());
            });
//            users.push(user);
            console.log("Added user");
            return true;
        } else {
            return false;
        }
    },
    lookup: function(user) {
        var result = users.filter(function(index) {
            return index.equals(user);
        });
        if (result.length === 1) {
            return result[0];
        } else {
            return null;
        }
    },
    size: function() {
        return users.length;
    }
};
