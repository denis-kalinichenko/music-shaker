var express = require('express');
var router = express.Router();
var checkAuth = require("../middleware/checkAuth");
var lfm = require("../lastfm");
var Day = require("../models/day");
var moment = require("moment");
var asyncLoop = require('node-async-loop');
var _ = require("lodash");
var network = require("../network");

/* GET panel. */

router.get('/panel', checkAuth, function(req, res, next) {
    lfm.setSessionCredentials(req.user.name, req.user.session_key);
    lfm.user.getInfo(function(err, userinfo) {
        if (err)
            next(err);
        var days = [];
        for(i = 1; i <= 7; i++) {
            days.push(moment().subtract(i, 'days'));
        }
        res.render('panel', { title: "Panel", userinfo: userinfo, days: days });
    });
})
    .post('/panel', checkAuth, function (req, res, next) {
        var username = req.user.name;
        var date = moment(req.body.date, "X");

        lfm.user.getRecentTracks({user: username, limit: 200, from: date.startOf('day').unix(), to: date.endOf('date').unix() }, function (err, recentTracks) {
            res.json(recentTracks);
        });
    })
    .post('/panel/learn', checkAuth, function (req, res, next) {
        var username = req.user.name;
        var data = req.body.data;
        var date = moment(req.body.date, "X");
        var emotion = req.body.emotion;

        network(username, data, emotion, function (err) {
            if(err){
                return res.render('error', {title: "Something went wrong", message: err.errmsg});
            }

            console.log("done");

            var day = new Day();
            day.date = date.toDate();
            day.username = username;
            day.emotions[emotion] = 1;

            day.save(function (err, _day) {
                if(err){
                    return res.render('error', {title: "Something went wrong", message: err.errmsg});
                }

                res.send("done");
            });
        });
    });

module.exports = router;