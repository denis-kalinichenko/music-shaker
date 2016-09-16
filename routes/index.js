var express = require('express');
var router = express.Router();
var config = require('../config');


/* GET home page. */

router.get('/', function(req, res, next) {
    if(req.user)
    {
        res.redirect('/demo');
    }
        else {
        res.render('index', { title: 'OMP' });
    }
});

module.exports = router;