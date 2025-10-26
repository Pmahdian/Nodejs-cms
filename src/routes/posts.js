const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createPost} = require('../controllers/postController');


// POST /api/posts + '/' = /api/posts/
router.post('/', authMiddleware, createPost);

module.exports = router;