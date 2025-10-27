const pool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        userId = req.user.userId;

        //step 2 : find user in databse without password
        result = await pool.query(
            'select username, email from users where id = ?',
            [userId]
        );
        
    } catch (error) {
        
    }
}