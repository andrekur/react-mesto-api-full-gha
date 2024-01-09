const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const  {signInValidator, signUpValidator } = require('../validators/login')


router.post('/signin', signInValidator, login);
router.post('/signup', signUpValidator, createUser);

module.exports = router;