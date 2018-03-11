/*

    Teh router for all /list/* pathes


    NOTE:  Order of pathes IMPORTANT
    Express will try to match top down
    If something before matches, .... then what should match NOT executed.
*/

var express = require('express');
var HomeNote = require('../models/homenote.js');
var HomeChecklist = require('../models/homechecklist.js');

var router = express.Router();

// List notes for current user
router.get('/', function(req, res, next) {

    HomeNote.findAll().then(function(notes) {
        //console.log(notes);
        res.render('checklist', {
            title: 'Checklist',
            homechecklist: notes
        });
    });
});

router.post('/add', function(req, res, next) {
  console.log("a gudfvbfishnfm: " + req.body.text);
    HomeNote.build({
        text: req.body.text,
        done: false
    }).save().then(function() {
        res.redirect("/home/checklist");
    }).catch(function(error) {
        console.log(error);
    })
});

router.get('/add', function(req, res, next) {
  //console.log("About to add: " + req.body);
    res.render('add', {title: 'Add'});
});

router.get('/delete', function(req, res, next) {
    console.log("Get delete");
    console.log("Hje " + req.query.id);
    HomeNote.findById(req.query.id).then(function(note) {
        res.render('delete', {
            text: 'Delete Note',
            note: note
        });
    });
});

router.post('/delete', function(req, res, next) {
    console.log("Get delete ID: " + req.body.id);
    HomeNote.findById(req.body.id).then(function(note) {
        return note.destroy();
    }).then(function() {
        res.redirect("/home/checklist");
    });
});


router.get('/edit', function(req, res, next) {
    console.log("Get edit");
    console.log("ID: " + req.query.id);
    HomeNote.findById(req.query.id).then(function(note) {
    res.render('edit', {
        text: 'Edit Note',
        note: note
      });
    });
});


router.post('/edit', function(req, res, next) {
    console.log("Post edit: " + req.body.id);
    console.log("This is the edit: " + req.body.text);
    HomeNote.findById(req.body.id).then(function(note) {
      return note.updateAttributes({text: req.body.text});
    }).then(function() {
      res.redirect("/home/checklist");
    });
});

module.exports = router;
