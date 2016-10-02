var express = require('express');
var router = express.Router();
var checkAuth = require("../middleware/checkAuth");
var lfm = require("../lastfm");
var _ = require("lodash");
var network = require("../network/run");

/* GET panel. */

router.get('/', checkAuth, function(req, res, next) {
    lfm.setSessionCredentials(req.user.name, req.user.session_key);
    lfm.user.getInfo(function(err, userinfo) {
        if (err)
            next(err);
        res.render('generate', { title: "Generate", userinfo: userinfo });
    });
})
    .post('/', checkAuth, function (req, res, next) {
        network(req.user.name, req.body.emotion, function (err, output) {
            if(err){
                return res.render('error', {title: "Something went wrong", message: err});
            }

            res.json(output);
        });
    });

module.exports = router;