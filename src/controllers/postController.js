const { Post, User, Category } = require('../models/associations');

const createPost = async (req, res) => {
    try {
        //step 1 : get data from request body
        const {title, content, category_id} = req.body;

        //step 2 : get userId from req.user moddleware
        const userId = req.user.userId

        //step 3 : date validation
        if (!title || !content)
            return res.status(400).json({
                success : false,
                error : 'title and content fields are required!'
            });
        
        //step 4 : save post in database with sequelize
        const post = await Post.create({
            title : title,
            content : content,
            user_id : userId,
            category_id : category_id || null
        });

        //step 5 : send success response with sequelize
        res.status(201).json(
            {
                success : true,
                message : 'post created successfully!',
                postId : post.id,
                title : title
            }
        );

        
    } catch (error) {
        //step 6 : error handling
        console.error('Create post error:', error);
        res.status(500).json({
            success : false,
            error : 'server error'
        });
        
    }
};

const getAllPosts = async (req, res) => {
    try {
        //step 1 : get data from database
        const [posts] = await pool.query(
            'SELECT p.id, p.title, p.content, p.created_at, u.username as author, c.name as category_name FROM posts p LEFT JOIN users u ON p.user_id = u.id LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC'
        );

        // step 2 : send response
        if (posts.length === 0)
            return res.status(200).json({
                success : true,
                message : "There is no post", 
                posts : []
        
            });
        res.status(200).json(
            {
                success : true,
                message : "Posts received successfully.",
                count : posts.length,
                posts : posts

            }
        );



        
    } catch (error) {
        //step 3 : Error handling 
        console.error('Get posts error:', error);
        res.status(500).json(
            {
                success : false,
                error : 'Server error'
            }
        );
    }



};


const getMyPosts = async (req, res) => {
    try {
        //step 1 : get userId from req.user moddleware
        const userId = req.user.userId

        //step 2 : get posts of the user from database
        const [posts] = await pool.query('SELECT p.id, p.title, p.content, p.created_at, u.username as author, c.name as category_name FROM posts p LEFT JOIN users u ON p.user_id = u.id LEFT JOIN categories c ON p.category_id = c.id WHERE p.user_id = ? ORDER BY p.created_at DESC', [userId]);

        //step 3 : send response
        if (posts.length === 0) 
            return res.status(200).json(
        {
            success : true,
            message : "There is no post",
            posts : []
        });
        res.status(200).json(
            {
                success : true,
                message : "Your posts received successfully.",
                count : posts.length,
                posts : posts
            }
        )


    } catch (error) {
        //step 4 : Error handling
        console.error('Get post of follwing user error:', error);
        res.status(500).json(
            {
                success : false,
                error : 'Server error'
            });

        
    }
};


const getPostById = async (req, res) => {
    try {
        //step 1 : get post id from req.params
        const postId = req.params.id;

        //step 2 : get a post by postId from database
        const [posts] = await pool.query(
            `SELECT 
                p.id,
                p.title, 
                p.content,
                p.created_at,
                p.updated_at,
                u.username as author,
                c.name as category_name
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.id
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?`,
            [postId]
        );

        //step 3 : 404 status res if there wasn't any posts
        if (posts.length === 0) 
            return res.status(404).json(
        {
            success : false,
            message : "post not found!"
        });

        //step 4 : send post
        res.status(200).json(
            {
                success : true,
                message : "this is the post that you looking for",
                post : posts[0]
            }
        );

        
    } catch (error) {
        //step 5 : Error handling
        console.error('Get post error:', error);
        res.status(500).json(
            {
                success : false,
                message : "Server error"
            }
        )

        
    }
}

const updatePost = async (req, res) => {
    try {
        // step 1 : get the post by id from params
        const postId = req.params.id;

        //step 2 : get data from request body
        const {title, content, category_id} = req.body;

        //step 3 : get user id from req.user middleware
        const userId = req.user.userId;


        //step 4 : validation
        if (!title && !content && !category_id){
            return res.status(400).json(
        {
            success : false,
            message : 'at least one field is required!'
        });
    }
        //step 5 : check for user and post id existing
        const [existingPosts] = await pool.query('select * from posts where id = ? and user_id = ?', 
            [postId, userId]
        );
        if (existingPosts.length === 0) {
            return res.status(404).json(
                {
                    success : false,
                    message : "post not found or you haven't access"
                }
            );
        };

        //stpe 6 : update post
        const [result] = await pool.query(' update posts set title = ?, content = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP where id = ?',
            [title, content, category_id, postId]
        );


        //step 7 : senf response
        res.status(200).json(
            {
                success : true,
                message : "post updated successfully.",
                postId : postId
            }
        );

    
        
    } catch (error) {
        //step 8 : Error handling
        console.error('Update post error', error);
        res.status(500).json(
            {
                success : false,
                message : "Server error"
            }
        )
        
    }
};


const deletePost = async (req, res) => {
    try {
        //step 1 : get post id by req.params
        const postId = req.params.id;

        //step 2 : get user id from req.user middleware
        const userId = req.user.userId;

        //step 3 : check for user and post id existing
        const [existingPosts] = await pool.query(
            'select * from posts where id = ? and user_id = ?',
            [postId, userId]
        );
        if (existingPosts.length === 0){
            res.status(404).json(
                {
                    success : false,
                    message : "post not found or you haven't access!"
                }
            );
            
        }

        //step 4 : delete post
        await pool.query('delete from posts where id = ?', [postId])

        //step 5 : send response 
        res.status(200).json(
            {
                success : true,
                message : "post deleted successfully.",
                postId : postId
            }
        );



        
    } catch (error) {
        //step 6 : Error handling
        console.error("Delete post error:", error);
        res.status(500).json(
            {
                success : false,
                message : 'Server error'
            }
        )
        
    }

}

module.exports = {createPost, getAllPosts, getMyPosts, getPostById, updatePost, deletePost};