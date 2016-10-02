module.exports = function(req, res, next) {
    if(!req.session.name) {
        return res.redirect('/');
    } else {
        next();
    }
};