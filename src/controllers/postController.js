const pool = require('../config/database')

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
        
        //step 4 : save post in database
        const [result] = await pool.query(
            'insert into posts (title, content, user_id, category_id) values (?, ?, ?, ?)',
            [title, content,userId, category_id]
        );

        //step 5 : send success response
        res.status(201).json(
            {
                success : true,
                message : 'post created successfully!',
                postId : result.insertId,
                title : title
            }
        )



        
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
        

        



        
    } catch (error) {
        
    }
}

module.exports = {createPost, getAllPosts, getMyPosts, getPostById};