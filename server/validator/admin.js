const { check } = require('express-validator')

exports.adminSignUpValidation = [
    check('username').not().isEmpty().withMessage('username is require'),
    check('username').isLength({ min: 4 }).withMessage('username must be at least 6 characters'),
    check('password').not().isEmpty().withMessage('password is require'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.adminSignInValidation = [
    check('username').not().isEmpty().withMessage('username or phone is require'),
    check('password').not().isEmpty().withMessage('password is require'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];