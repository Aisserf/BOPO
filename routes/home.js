/*

    This is the router for pathes /todo/ (but not /todo/list)

    **** NOTHING TO DO HERE ****

*/

var express = require('express');
var router = express.Router();
var homechecklist = require('../models/homechecklist.js');
var HomeNote = require('../models/homenote.js');
var checklist = require('./checklist.js');
var userModule = require('../models/user.js');
var userRegistry = require('../models/userregistry.js');

// Hierarcical routing
router.use("/checklist", checklist);

router.get('/', function(req, res, next) {
    res.render('home', {text: 'Your BOPO on the Web'});
});

/*
router.get('/login', function(req, res, next) {
    res.render('login', {text: 'Please enter mail and password'});
});
*/

router.get('/register', function(req, res, next) {
    res.render('register', {text: 'Please fill in form'});
});

/*
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/todo');
});
*/

/*
router.post('/login', function(req, res, next) {
    var tmp = new User("", "", req.body.email)
    var user = userRegistry.lookup(tmp);

    console.log(user);

    if (!user) {
        res.redirect('register');
    } else {
        if (user.password === req.body.password) {
            req.session.user = user;
            res.redirect('/todo/list');
        } else {
            req.session.error = "Bad password";
            // Possibly send as ?error=badpasswd
            res.redirect('/todo/login');
        }
    }
});
*/

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var user = new userModule.User(req.body.name, req.body.userid, req.body.email, req.body.password);
    console.log(user);
    if (!userRegistry.lookup(user)) {
        userRegistry.register(user);
        res.redirect("/home");
    } else {
        console.log("User already in registry");
        res.render('error', {
            title: 'User exists',
            msg: "This user exists"
        });
    }
});

module.exports = router;
