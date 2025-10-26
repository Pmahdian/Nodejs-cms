const authMiddleware = require('../middleware/authMiddleware');

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

        /


        
    } catch (error) {
        
    }
}