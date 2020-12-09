const express = require('express');
const router = express.Router();

const { listUser, signUpUser, loginUser, createUser, updateUser, singleUser, chekLogin } = require('../controllers/user');

const { userSignUpValidation, userSignInValidation } = require('../validator/user')
const { runValidation } = require('../validator');

const { requireSignin, requireAdmin } = require('../middlewares')

router.get('/', listUser);
router.get('/:id', singleUser);
router.post('/signup', userSignUpValidation, runValidation, signUpUser);
router.post('/signin', userSignInValidation, runValidation, loginUser)
router.post('/create', requireSignin, requireAdmin, userSignUpValidation, runValidation, createUser)
router.post('/update', requireSignin, requireAdmin, updateUser)
router.post('/check', requireSignin, chekLogin)
module.exports = router;
