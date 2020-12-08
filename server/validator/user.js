const { check } = require('express-validator')

exports.userSignUpValidation = [
    check('name').not().isEmpty().withMessage('name is require'),
    check('name').isLength({ min: 6 }).withMessage('name must be at least 6 characters'),
    check('phone').not().isEmpty().withMessage('phone is require'),
    check('phone').isLength({ min: 10}).isLength({ max: 10}).withMessage('phone not correct'),
    check('password').not().isEmpty().withMessage('password is require'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.userSignInValidation = [
    check('username').not().isEmpty().withMessage('username or phone is require'),
    check('password').not().isEmpty().withMessage('password is require'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];