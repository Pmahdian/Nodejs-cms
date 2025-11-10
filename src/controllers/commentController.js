const { Comment, User, Post} = require('../models/associations');

// New comment creation function
const createComment = async (req,res) => {
    try {
        // step 1: Receiviing data from differnret places
        const { content } = req.body; 
        const { id : post_id } = req.params;
        const user_id = req.user.userId;
        
        // step 2: Data validation with
        
    } catch (error) {
        
    }
}