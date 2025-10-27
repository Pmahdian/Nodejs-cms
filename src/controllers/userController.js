const pool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        userId = req.user.userId;
        
    } catch (error) {
        
    }
}