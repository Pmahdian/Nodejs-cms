const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); 
const authMiddleware = require('../middleware/authMiddleware');
const { testAuth } = require('../controllers/testController');

router.post('/register', register); 
router.post('/login',login)

router.get('/test-protected', authMiddleware, testAuth)

module.exports = router;



