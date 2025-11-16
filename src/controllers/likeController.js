const { Like, Post, User } = require('../models/associations');

const likePost = async (req, res) => {
    try {
        
        // step 1 : get data
        const { id: post_id } = req.params;
        const user_id = req.user.userId //get userId from req.user moddleware
        
        
        // step 2 : checking for existance of the post
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).json({
                success : false,
                message : 'The desired post was not found!'
            });
        }
        
        // step 3 : checking duplicate likes
        const existingLike = await Like.findOne({
            where : {
                user_id : user_id,
                post_id : post_id,
                type: 'like'
            }
        });
        if (existingLike){
            return res.status(400).json({
                success : false,
                message : 'You have already liked this post!'
            });
        }
        
        // step 4 : create like
        const like = await Like.create({
            user_id : user_id,
            post_id : post_id,
            type : 'like'
        });
        
        // step 5 : send response
        res.status(401).json({
            success : true,
            message : 'Post liked successfully',
            data : like
        })

    } catch (error) {
        // Error handling
        console.error('Like post error:', error);
        res.status(500).json({
            success : false,
            error : 'Server error'
        })
        
    }

}

const unlikePost = async (req, res) => {
    try {
        // step 1 : get data
        const { id : post_id } = req.params;
        const user_id = req.user.userId;

        // step 2 : Finding llikes
        const like = await Like.findOne({
            where : {
                user_id : user_id,
                post_id : post_id,
                type : 'like'
            }
        });

        if (!like) {
            return res.status(404).json({
                success : false,
                message : 'Like not found!'
            });
        }


        
    } catch (error) {
        
    }
}