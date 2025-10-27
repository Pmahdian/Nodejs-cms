const pool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : find user in databse without password
        const [users] = await pool.query(
            'select username, email from users where id = ?',
            [userId]
        );

    
        if (users.length === 0){
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
                user : users[0]
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

const updateProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : get data from req.body
        const {username ,email} = req.body;

        //step 3 : validation
        if (!username || !email) {
            return res.status(400).json(
                {
                    success : false,
                    message : 'At least one filed is required'
                }
            )
        }
        // step 4 : check for duplicate username and email
        const [result] = await pool.query(
            'select id from users where (username = ? or email = ?) and id != ?',
            [username, email, userId]
        );

        //step 5 : update user in database
        


        
    } catch (error) {
        
    }
}

module.exports = {getProfile};