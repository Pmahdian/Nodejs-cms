const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');
const { createPostSchema, updatePostSchema } = require('../validators/postValidator');

const { 
    createPost,
    getAllPosts, 
    getMyPosts, 
    getPostById, 
    updatePost, 
    deletePost
} = require('../controllers/postController');


// POST /api/posts + '/' = /api/posts/
router.post('/', authMiddleware,validateRequest(createPostSchema) ,createPost);
// GET /api/posts + '/' = /api/posts/
router.get('/', getAllPosts)
// GET myPosts
router.get('/my-posts', authMiddleware, getMyPosts);
// Get postById /:id
router.get('/:id', getPostById);
// PUT /api/posts/:id
router.put('/:id', authMiddleware, validateRequest(updatePostSchema), updatePost);
//DELETE /api/posts/:id
router.delete('/:id',authMiddleware, deletePost);



module.exports = router;
