const express = require('express');
const router = express.Router();
const {
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost
} = require('../controllers/likeController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

//POST - like
router.post('/posts/:id/like', likePost);
//DELETE - unlike
router.delete('/posts/:id/like', unlikePost);

//POST - bookmark
router.post('/posts/:id/bookmark', bookmarkPost);

//DELETE - unbookmark
router.delete('/posts/:id/bookmark', unbookmarkPost);



module.exports = router;