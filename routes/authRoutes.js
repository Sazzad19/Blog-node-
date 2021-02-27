const router = require('express').Router();
const {loginGetController, loginPostController, signupGetController, signupPostController, logoutController} = require('../controllers/authController')
const signupValidator = require('../validators/auth/signupValidator')
const loginValidator = require('../validators/auth/loginValidator')
router.get('/signup', signupGetController)
router.post('/signup', signupValidator, signupPostController)
router.get('/login', loginGetController)
router.post('/login', loginValidator, loginPostController)
router.get('/logout', logoutController)
module.exports = router