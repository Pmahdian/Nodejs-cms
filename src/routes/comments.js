const express = require('express');
const router = express.Router;
const commmentController = require('../controllers/commentController');

const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');

const { createCommentSchema } = require('../validators/commentValidator');


