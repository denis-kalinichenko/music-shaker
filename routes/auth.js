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
                return res.render('error', {title: "Something went wrong", message: err.message});
            }

            var user = new User();
            user.name = info.name;
            user.realname = info.realname;
            user.session_key = session.key;
            user.save(function (err, user) {
                if (err) {
                    if(err.code === 11000) {
                        User.findOneAndUpdate({name: info.name}, {$set:{session_key:session.key}}, {new: true}, function(err, _user){
                            if(err){
                                return res.render('error', {title: "Something went wrong", message: err.errmsg});
                            }

                            req.session.name = _user.name;
                            req.session.realname = _user.realname;
                            req.session.session_key = _user.session_key;
                            res.redirect("/");
                        });
                    } else {
                        res.render('error', {title: "Something went wrong", message: err.errmsg});
                    }
                } else {
                    req.session.name = user.name;
                    req.session.realname = user.realname;
                    req.session.session_key = user.session_key;
                    res.redirect("/");
                }
            });
        });

    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;