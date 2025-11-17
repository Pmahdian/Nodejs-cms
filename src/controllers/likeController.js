const { Like, Post, User, Category } = require('../models/associations');
const { message } = require('../validators/userValidator');

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

        // step 3 : Ownership checked - only the owner of the like can unlike
        if (like.user_id !== user_id){
            return res.status(403).json({
                success : false,
                message : 'You do not have permission to unlike this post.'
            });
        }

        // step 4 : delete like
        await like.destroy();

        // step 5 : send response
        res.status(200).json({
            success : false,
            message : 'Post unliked successfully.'
        });

    } catch (error) {
        // Error handling
        console.error('Unlike post error:', error);
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
        
    }
}


const bookmarkPost = async (req, res) =>{
    try {
        // step 1 : get data
        const { id : post_id } = req.params;
        const user_id = req.user.userId;

        // step 2 : checking for existance of the post
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).json({
                success : false,
                message : 'The desired post was not found!'
            });
        }

        // step 3 : checking duplicate bookmarks
        const existingBookmark = await Like.findOne({
            where : {
                user_id : user_id,
                post_id : post_id,
                type: 'bookmark'
            }
        });
        if (existingBookmark){
            return res.status(400).json({
                success : false,
                message : 'You have already bookmarked this post!'
            });
        }

        // step 4 : create bookmark
        const bookmark = await Like.create({
            user_id : user_id,
            post_id : post_id,
            type : 'bookmark'
        });

        // step 5 : send response
        res.status(201).json({
            success : true,
            message : 'Post bookmarked successfully!',
            data : bookmark
        });
        
        
    } catch (error) {
        // error handling
        console.error('Bookmark post error:', error);
        res.status(500).json({
            success : false,
            error : 'Server error'
        });
        
    }
    
};


const unbookmarkPost = async (req, res) => {
    try {
        // step 1 : get data
        const { id : post_id } = req.params;
        const user_id = req.user.userId;

        // step 2 : Finding llikes
        const bookmark = await Like.findOne({
            where : {
                user_id : user_id,
                post_id : post_id,
                type : 'bookmark'
            }
        });

        if (!bookmark) {
            return res.status(404).json({
                success : false,
                message : 'bookmark not found!'
            });
        }

        // step 3 : Ownership checked - only the owner of the bookmark can unbookmark
        if (bookmark.user_id !== user_id){
            return res.status(403).json({
                success : false,
                message : 'You do not have permission to unbookmark this post.'
            });
        }

        // step 4 : delete like
        await bookmark.destroy();

        // step 5 : send response
        res.status(200).json({
            success : true,
            message : 'Post unbookmarked successfully.'
        });

    } catch (error) {
        // Error handling
        console.error('Unbookmark post error:', error);
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
        
    }
}

// Function to get user's liked posts
const getUserLike = async (req, res) => {
    try {
        // step 1 : get user id
        const user_id = req.user.userId;

        // step 2 : find all user likes
        const likes = await Like.findAll({
            where : {
                user_id : user_id,
                type : 'like',
            },
            include : [
                {
                    model : Post,
                    as : 'post',
                    include : [
                        {
                            model : User,
                            as : 'author',
                            attributes : ['id', 'username']
                        },
                        {
                            model : Category,
                            as : 'category',
                            attributes : ['id', 'name']
                        }
                    ]
                }
            ],
            order : [['created_at', 'DESC']]
        });

        // step 3 : convert to the appropriate format
        const likedPosts = likes.map(like => like.post);

        // step 4 : send response
        res.status(200).json({
            success : true,
            message : 'Liked posts retrieved successfully',
            data : likedPosts,
            count : likedPosts.length
        });
        
    } catch (error) {
        
    }

}


module.exports = {
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost
}