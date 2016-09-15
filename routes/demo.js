var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/demo', function(req, res, next) {
    res.render('demo', { title: 'Demo' });
});

module.exports = router;