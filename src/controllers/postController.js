const authMiddleware = require('../middleware/authMiddleware');
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

module.exports = {createPost};