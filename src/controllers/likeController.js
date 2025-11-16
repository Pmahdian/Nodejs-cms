const { Like, Post, User } = require('../models/associations');

const likePost = async (req, res) => {
    // step 1 : get data
    const { id: post_id } = req.params;
    const user_id = req.user.userId //get userId from req.user moddleware
    
}