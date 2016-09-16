var User = require('../models/user');


module.exports = function(req, res, next) {
    req.user = res.locals.user = null;

    if (!req.session.name) return next();

    User.findOne({ name: req.session.name }, function(err, user) {
        if (err) return next(err);

        req.user = res.locals.user = user;
        next();
    });
};