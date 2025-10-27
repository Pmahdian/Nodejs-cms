const pool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : find user in databse without password
        const [user] = await pool.query(
            'select username, email from users where id = ?',
            [userId]
        );

    
        if (user.length === 0){
            return res.status(404).json(
                {
                    success : false,
                    message : 'user not found'
                }
            )

        }
        //step 3 : send user information
        res.status(200).json(
            {
                success : true,
                user : user[0]
            }
        )

        
    } catch (error) {
        //step 4 : Error handling
        console.error(' Get profile error:', error);
        res.status(500).json(
            {
                success : false,
                message : "Server error"
            }
        )
        
    }
}