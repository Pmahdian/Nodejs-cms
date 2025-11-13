const { Comment, User, Post} = require('../models/associations');

// New comment creation function
const createComment = async (req,res) => {
    try {
        // step 1: Receiviing data from differnret places
        const { content } = req.body; 
        const { id : post_id } = req.params;
        const user_id = req.user.userId;
        
        // step 2: Data validation with Joi : there is no need to validation here, i validate data in route


        //step 2 :  check for the existence of the post
        const post = await Post.findByPk(post_id);
        if (!post) {
            return res.status(404).json({
                success : false,
                message : 'The desired post was not found'
            });
        };
        
        // step 3 : create comment
        const comment = await Comment.create({
            content : content,
            user_id : user_id,
            post_id : post_id
        });

        // step 4 : Loading user information
        const commentWithUser = await Comment.findByPk(comment.id,{
            include : {
                model : User,
                attributes : ['id', 'username']
            }
        });

        //step 5 : response
        res.status(201).json({
            success : true,
            message : 'Comment added successfully!',
            data : commentWithUser
        });

        
        
        
    } catch (error) {
        // Error handling
        console.error('Create Comment error:', error);
        res.status(500).json({
            success : false,
            error : 'server error'
        });
        
    }
};


const getPostComments = async (req, res) => {
    try {
        const {id : post_id} = req.params;

        // Get all comments on this post along with user information
        const comments = await Comment.findAll({
            where : {post_id : post_id},
            include : {
                model : User,
                attributes : ['id', 'username'],
                order :[['created_at', 'DESC']] //newest comment first
            }
        })

        //send response
        res.status(200).json({
            success : true,
            message : 'Comments received successfully',
            data : comments,
            count : comments.length
        });


        
    } catch (error) {
         // Error handling
        console.error('Get Comment error:', error);
        res.status(500).json({
            success : false,
            error : 'server error'
        });
        
    }

}


const deleteComment = async (req, res) => {
    try {
        // step 1 = get data from body
        const {id : comment_id} = req.params;
        const user_id = req.user.userId;

        //step 2 : finding comment
        const comment = await Comment.findByPk(comment_id);
        if (!comment) {
            return res.status(404).json({
                success : false,
                message : 'Comment not found!'
            });
        }

        // step 3 : Ownership check: Only the comment owner can delete it
        if (comment.user_id !== user_id){
            return res.status(403).json({
                success : false,
                message : 'You do not have permission to delete this comment.'
            })
        }
        
        //step 4 : Delete comment
        await comment.destroy();

        
    } catch (error) {
        
    }
}



module.exports = { 
    createComment,
    getPostComments
}