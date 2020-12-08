const express = require('express');
const router = express.Router();

const { listUser, signUpUser, loginUser, createUser, updateUser } = require('../controllers/user');

const { userSignUpValidation, userSignInValidation } = require('../validator/user')
const { runValidation } = require('../validator')

router.get('/', listUser);
router.post('/signup', userSignUpValidation, runValidation, signUpUser);
router.post('/signin', userSignInValidation, runValidation, loginUser)
router.post('/create', userSignUpValidation, runValidation, createUser)
router.post('/update', updateUser)

module.exports = router;