var Sequelize = require('sequelize');
var sequelize = require('../db/home_db_orm.js');

// Create mapping between table and model
var HomeNote = sequelize.define('notes', {
    text: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

//Constructor


function Note(text) {
  this.text =text;
};

Note.prototype = (function() {
    //console.log("Hämtar delete-funktionen från homenote");

    // Must supply notes, "this.notes" or "notes" doesn't work
    function find(id, notes) {
        var result = notes.filter(function(v) {
            return v.id === id;
        });
        return result[0];
    }

    return {
        getNotes: function() { // Todo start, end
            return this.notes.sort(function compare(a, b) {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
        },
        getById: function(id) {
            return find(id, this.notes);
        },
        add: function(note) {
          console.log("WE ARE NOW ADDING" + note);
            var found = this.getById(note);
            if (!found) {
                this.notes.push(note);
            }
        },
        update: function(note) {
            console.log("Trying to update with: " + note);
            var old = this.delete(note.id);
            if (old) {
                note.id = old.id;
                //note.dateTime = old.dateTime;
                this.add(note);
            }

            console.log("Hej, vi ska edita saker");
        },
        delete: function(id) {
          console.console.log("Går in i delete-funktionen från homenote");
            var note = find(id, this.notes);
            if (note) {
                this.notes.splice(this.notes.indexOf(note), 1);
            }
            return note;
        },
        size: function() {
            return this.notes.length;
        }
    }
})();



module.exports = HomeNote;
//module.exports = {Note: Note, HomeNote: HomeNote}



/*
// private static
var counter = 100;

// Contructor (kind of overloaded)
function HomeNote(id, text, date, done) {
    this.id = (!id)
        ? counter++
        : id;
    this.text = (!text)
        ? "empty"
        : text;
    //this.dateTime = (!date)
    //    ? new Date()
    //    : date;
    this.done = (!done)
        ? false
        : done;
};

module.exports = HomeNote;
*/
/*
	Simple way to debug using node-debug
	Install
	$ npm install -g node-debug

	Run
	node-debug user.js  (will open browser, like Chrome debugger)

*/
/*
var test = function () {
	var n = new TodoNote("new", "", 1);
	console.log(n);
}();
*/
