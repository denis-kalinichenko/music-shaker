var express = require('express');
var router = express.Router();
var checkAuth = require("../middleware/checkAuth");
var lfm = require("../lastfm");

/* GET home page. */

router.get('/panel', checkAuth, function(req, res, next) {
    lfm.setSessionCredentials(req.user.name, req.user.session_key);
    lfm.user.getInfo(function(err, userinfo) {
        if (err)
            next(err);
        lfm.user.getRecentTracks({user: req.user.name, limit: 200, from: Math.round(new Date("2016-09-16").getTime()/1000), to: Math.round(new Date().getTime()/1000)}, function(err, recentTracks) {
            if (err)
                next(err);
            res.render('panel', { title: "Panel", userinfo: userinfo, recentTracks: recentTracks });
        });
    });
});

module.exports = router;