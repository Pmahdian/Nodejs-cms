const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validatorRequest = require('../middleware/validationMiddleware');
const {
    updateProfileSchema 
} = require('../validators/userValidator');

const {
    getProfile,
     updateProfile
    } = require('../controllers/userController');


// Routes with valdidation
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', validatorRequest(updateProfileSchema), authMiddleware, updateProfile);

module.exports = router;
