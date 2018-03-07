/*
	Todolist model object

	NOTE: Much easier to test if using objects (not module variables)
*/
var HomeNote = require('./homenote.js');
var sequelize = require('../db/home_db_orm.js');

module.exports = {
  register: function(note) {
    console.log("About to add: " + note);
    var n = this.lookup(note);
    if (!n) {

      console.log("Adding note");
      sequelize.sync()
        .then(() => console.log("Synchronised to database"))
        .then(() => HomeNote.create(note))
        .then(res => {
          console.log(res.toJSON());
        });

        console.log("Added note");
        return true;
        
      }else{
        return false;
      }
    },
    lookup: function(note) {
      var result = notes.filter(function(index) {
        return index.equals(note);
      });
      if(result.length === 1) {
        return result[0];
      } else {
        return null;
      }
    },
    size: function() {
      return notes.length;
    }

};

//xxxxxxxxx

/*
// Constructor
function HomeChecklist() {
    this.notes = [
        new HomeNote(1, 'Äta gröt', null),
        new HomeNote(2, 'Rensa sallad', null),
        new HomeNote(3, 'Jaga älg', null)
    ];
};

//module.exports = HomeChecklist;

// public (a singleton)
HomeChecklist.prototype = (function() {

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
            var found = this.getById(note);
            if (!found) {
                this.notes.push(note);
            }
        },
        update: function(note) {
            var old = this.delete(note.id);
            if (old) {
                //note.id = old.id;
                //note.dateTime = old.dateTime;
                this.add(note);
            }
        },
        delete: function(id) {
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
*/
