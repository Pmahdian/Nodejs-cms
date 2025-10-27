const pool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : find user in databse without password
        const result = await pool.query(
            'select username, email from users where id = ?',
            [userId]
        );

    
        if (result === 0){
            return res.status(404).json(
                {
                    success : false,
                    message : 'user not found'
                }
            )

        }
        
    } catch (error) {
        
    }
}