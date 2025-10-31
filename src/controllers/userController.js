const User = require('../models/User');
const { Op } = require('sequelize');

const getProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : find user in databse without password with sequelize
        const user = await User.findByPk(userId,
            {
                attributes : ['id', 'username', 'email', 'created_at'] //without password
            });
    
        if (!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        //step 3 : send user information
        res.status(200).json(
            {
                success : true,
                user : user
            })       
    } catch (error) {
        //step 4 : Error handling
        console.error(' Get profile error:', error);
        res.status(500).json(
            {
                success : false,
                message : "Server error"
            })
        }
}

const updateProfile = async (req, res) => {
    try {
        //step 1 : get userId from req.user middleware
        const userId = req.user.userId;

        //step 2 : get data from req.body
        const {username ,email} = req.body;

        //step 3 : validation
        if (!username && !email) {
            return res.status(400).json(
                {
                    success : false,
                    message : 'At least one filed is required'
                })
        }

        //step 4 check for duplicate username or email with sequeliz
        if ( username || email ) {
            const existingUser = await User.findOne(
                {
                    where : {
                        [Op.or] : [
                            {username :username},
                            {email : email}
                        ],
                        id : {[Op.ne] : userId}
                    }});

            if (existingUser) {
               return res.status(400).json(
                    {
                        success : false,
                        message : 'Email or Username is duplicate'
                    })           
             }      
        }

        //step 5 update user in DB with sequelize
        const updateData = {}
        if (username) updateData.username = username;
        if (email) updateData.email = email;

        const [affectedRows] = await User.update(updateData,
            {
                where : 
                {id : userId}
            }
        )
        if (affectedRows === 0){
            return res.status(404).json(
                {
                    success : false,
                    message : 'User not found'
                });
            }
        //step 6 : send response
        res.status(200).json(
            {
                success : true,
                message : "User updated successfully."
            }
        )
       
    } catch (error) {
        // step 7 : Error handling
        console.error('Update user error;', error);
        res.status(500).json(
            {
                success : false,
                message : "server error"
            }
        )}
    };

module.exports = {getProfile, updateProfile};