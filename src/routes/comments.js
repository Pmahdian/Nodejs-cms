const express = require('express');
const router = express.Router;
const {  createComment,
    getPostComment,
    deleteComment } = require('../controllers/commentController');

const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');

const { createCommentSchema } = require('../validators/commentValidator');

// POST /api/posts/:id/comments
router.post('/post/:id/comments',
    authMiddleware,
    validateRequest(createCommentSchema),
    createComment
);
// GET /api/posts/:id/comments
router.get('/post/:id/comments', getPostComment);

// DELETE /api/comments/:id 
router.delete('/comments/:id', authMiddleware, deleteComment);



module.exports = router;