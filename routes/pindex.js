const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);
const userRoutes = require('./accountRoutes');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("/products", { logged: true ,csrfToken: req.csrfToken()});
    } else {
        res.render("/products", { logged: false,csrfToken: req.csrfToken() });
    }
});

router.get('/login', (req, res) => {
    res.render("index/login", { csrfToken: req.csrfToken() });
});

router.get('/register', (req, res) => {
    res.render("index/register", { csrfToken: req.csrfToken() });
});

router.post('/register', (req, res) => {
    // get all the values 
    const { email, username, password, confirmpassword } = req.body;
    // check if the are empty 
    if (!email || !username || !password || !confirmpassword) {
        res.render("index/register", { err: "All Fields Required !", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("index/register", { err: "Password Don't Match !", csrfToken: req.csrfToken() });
    } else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        User.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("index/register", { err: "User Exists, Try Logging In !", csrfToken: req.csrfToken() });
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        User({
                            username: username,
                            email: email,
                            password: hash,
                            googleId: null,
                            provider: 'email',
                        }).save((err, data) => {
                            if (err) throw err;
                            // login the user
                            // use req.login
                            // redirect , if you don't want to login
                            res.redirect('/login');
                        });
                    })
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/products',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/products');
    });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile');
});


router.get('/user', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("index/profile", { user:user,img : req.user.img,username: req.user.username, email : req.user.email,firstname : req.user.firstname,surname : req.user.surname,phonenumber : req.user.phonenumber,address : req.user.address,country : req.user.country,state : req.user.state,sos : req.user.sos,csrfToken: req.csrfToken() });
        }
    });
});
router.get('/user/:id', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("index/profile", { user:user,img : req.user.img,username: req.user.username, email : req.user.email,firstname : req.user.firstname,surname : req.user.surname,phonenumber : req.user.phonenumber,address : req.user.address,country : req.user.country,state : req.user.state,sos : req.user.sos,csrfToken: req.csrfToken() });
        }
    });
});


router.get("/user/:id/edit", checkAuth, function(req, res){
    //find the campground with provided ID
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("index/edit", {user: user,csrfToken: req.csrfToken()});
        }
    });
});

router.put("/user/:id/",checkAuth, function(req, res){
    // find and update the correct campground
    User.findByIdAndUpdate(req.params.id,req.body.user,function(err,user){
		if(err || !user) {
			req.flash("error","user not found!!");
			res.redirect("/producs");
		} else {
			req.flash("success","user edited!!");
			res.redirect("/profile" + req.params.id);
		}
	});
});





router.use(userRoutes);

module.exports = router;