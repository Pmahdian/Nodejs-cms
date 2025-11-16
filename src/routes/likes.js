const express = require('express');
const router = express.Router();
const {
    likePost,
    unlikePost
} = require('../controllers/likeController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
