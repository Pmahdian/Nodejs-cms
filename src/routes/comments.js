const express = require('express');
const router = express.Router;
const { createComment } = require('../controllers/commentController');

const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');

const { createCommentSchema } = require('../validators/commentValidator');

// POST /api/posts/:id/comments
router.post('/post/:id/comments',
    authMiddleware,
    validateRequest(createCommentSchema),
    createComment
)