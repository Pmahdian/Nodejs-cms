const express = require('express');
const router = express.Router();
const {
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost
} = require('../controllers/likeController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);

//POST - like
router.post('/posts/:id/like', likePost);



//POST - unlike
router.post('/posts/:id/like', unlikePost);



module.exports = router;