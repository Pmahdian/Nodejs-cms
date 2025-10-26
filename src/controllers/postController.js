const authMiddleware = require('../middleware/authMiddleware');

const createPost = async (req, res) => {
    try {
        //step 1 : get data from request body
        const {title, content, category_id} = req.body;

        //step 2 : get userId from req.user moddleware

        
    } catch (error) {
        
    }
}