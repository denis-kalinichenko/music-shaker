var express = require('express');
var router = express.Router();
var config = require("../config");
var lfm = require("../lastfm");
var User = require('../models/user');

router.get('/', function (req, res, next) {
    var authUrl = lfm.getAuthenticationUrl({ 'cb' : config.get("protocol") + '://' + config.get("domain") + ':' + config.get("port") +'/auth/callback' });
    res.redirect(authUrl);
});

router.get('/callback', function (req, res, next) {
    lfm.authenticate(req.query.token, function (err, session) {
        if (err) {
            return res.render('error', {title: "Something went wrong", message: err.message})
        }

        lfm.setSessionCredentials(session.name, session.key);
        lfm.user.getInfo(function(err, info) {
            if(err){
                return res.render('error', {title: "Something went wrong", message: err.message})
            }

            var user = new User();
            user.name = info.name;
            user.realname = info.realname;
            user.session_key = session.key;
            user.save(function (err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });

    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;