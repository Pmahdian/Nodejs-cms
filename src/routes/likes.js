const express = require('express');
const router = express.Router();
const {
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    getUserLikes,
    getUserBookmarks
} = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');



//POST - like
router.post('/posts/:id/like', authMiddleware, likePost);
//DELETE - unlike
router.delete('/posts/:id/like', authMiddleware, unlikePost);

//POST - bookmark
router.post('/posts/:id/bookmark', authMiddleware, bookmarkPost);

//DELETE - unbookmark
router.delete('/posts/:id/bookmark', authMiddleware, unbookmarkPost);

// GET Liked Posts
router.get('/users/me/likes', authMiddleware, getUserLikes);

// Get Bookmarked Posts
router.get('/users/me/bookmarks', authMiddleware, getUserBookmarks);




module.exports = router;