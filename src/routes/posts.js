const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createPost, getAllPosts, getMyPosts} = require('../controllers/postController');


// POST /api/posts + '/' = /api/posts/
router.post('/', authMiddleware, createPost);
// GET /api/posts + '/' = /api/posts/
router.get('/', getAllPosts)
// GET myPosts
router.get('/my-posts', authMiddleware, getMyPosts);



module.exports = router;