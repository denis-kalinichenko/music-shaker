var express = require('express');
var router = express.Router();
var passport = require("passport");
var LastFMStrategy = require('passport-lastfm');
var _ = require('lodash');
var cb_url = 'http://localhost:8000';
var config = require("../config");

// passport.use(new LastFmStrategy({
//     'api_key': process.env.LASTFM_KEY,
//     'secret': process.env.LASTFM_SECRET,
//     'callbackURL': cb_url + '/auth/lastfm/callback'
// }, function(req, sessionKey, done) {
//     // Find/Update user's lastfm session
//
//     // If user logged in
//     if (req.user){
//         User.findById(req.user.id, function (err, user) {
//             if (err) return done(err);
//
//         var creds = _.find(req.user.tokens, {type:'lastfm'});
//         // if creds already present
//         if (user.lastfm && creds){
//             req.flash('info', {msg:'Account already linked'});
//
//             return done(err, user, {msg:'Account already linked'})
//         }
//
//         else{
//             user.tokens.push({type:'lastfm', username:sessionKey.username, key:sessionKey.key });
//             user.lastfm = sessionKey.key;
//
//             user.save(function(err){
//                 if (err) return done(err);
//                 req.flash('success', {msg:"Last.fm authentication success"});
//                 return done(err, user, sessionKey);
//             });
//         }
//     });
//     }
//     else{
//         return done(null, false, {message:'Must be logged in'});
//     }
// }));

module.exports = function(passport) {
    router.get('/', function (req, res, next) {
        res.send("");
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};

// router.get('/lastfm', passport.authenticate('lastfm'));
// router.get('/lastfm/callback', function(req, res, next){
//     passport.authenticate('lastfm', {failureRedirect:'/'}, function(err, user, sesh){
//         res.redirect('/');
//     })(req, {} );
// });