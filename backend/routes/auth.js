const express = require('express');
const { register } = require('../controllers/register');
const { login, authenticate } = require('../controllers/login');

const AsyncHandler = require('../middleware/AsyncHandler');
const validate = require('../middleware/validate');
const { registerSchema } = require('../Validator/authValidator');
const { loginSchema } = require('../Validator/loginSchema');
const router = express.Router();


router.post('/register', validate(registerSchema), AsyncHandler(register));
router.post('/login', validate(loginSchema), AsyncHandler(login));
router.post('/authenticate', AsyncHandler(authenticate));

module.exports = router;




