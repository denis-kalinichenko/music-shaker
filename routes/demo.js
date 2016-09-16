var express = require('express');
var router = express.Router();
var checkAuth = require("../middleware/checkAuth");


/* GET home page. */

router.get('/demo', checkAuth, function(req, res, next) {
    res.render('demo', { title: 'Demo' });
});

module.exports = router;