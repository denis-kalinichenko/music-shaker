module.exports = function(req, res, next) {
    if(!req.session.name) {
        return next(res.redirect('/'));
    }
    next();
};