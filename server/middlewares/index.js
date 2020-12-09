const expressJwt = require('express-jwt');

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['HS256']
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.requireAdmin = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role === 'admin') {
            req.profile = user;
            next();
        } else {
            return res.status(400).json({
                error: 'Not Authorized'
            });
        }

    });
};
