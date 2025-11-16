const { Like, Post, User } = require('../models/associations');

const likePost = async (req, res) => {
    // step 1 : get data
    const { id: post_id } = req.params;
    const user_id = req.user.userId //get userId from req.user moddleware


    // step 2 : checking for existance of the post
    const post = await Post.findByPk(post_id);
    if (!post) {
        res.status(404).json({
            success : false,
            message : 'The desired post was not found!'
        });
    }
}