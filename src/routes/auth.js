const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { testAuth } = require('../controllers/testController'); 
const validateRequest = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');


// Routes 
router.post('/register', validateRequest(registerSchema) ,register);
router.post('/login',validateRequest(loginSchema) ,login);




// router.get('/test-protected', authMiddleware, testAuth);

module.exports = router;