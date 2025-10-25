const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
    try {
        //step 1 : get values from request body
       const {username , email, password} = req.body;

       //step 2 - validation
       if (!username || !email || !password)
            return res.status(400).json({error : 'All fields are required!'});


       //step 3 : Checking for user existence
       const [users] = await pool.query(
        'select * from users where email = ? or username = ?',
        [email, username]
       )
       if (users.length > 0 )
        return res.status(400).json({error: 'User already exists!'})

       //step 4 : password hashing
       const hashedPassword = await bcrypt.hash(password, 10);


       //step 5 : insert user in database
       const [result] = await pool.query(
        'insert into users(username, email, password) values(?, ?, ?)',
        [username, email, hashedPassword]
       );

       //step 6 : send a Successful response
       res.status(201).json(
        {
            message : 'User created successfylly',
            userId : result.insertId
        }
       );

        
    } catch (error) {
        console.error('Register error', error);
        res.status(500).json({error : 'Server error'});
        
    }
}


const login = async(req,res)=>{
    try {
        //step 1 : get values from body
        const {username, email, password} = req.body;

        //step 2 : validation values
        if(!username || !email || !password) 
            return res.status(400).json({error : 'All fields are required!'})

        //step 3 : find user with email
        const user = await pool.query(
            'select * from useres where email = ?',
        [email]);

        if (!user) return res.status(500).json({error : 'user is not exists!'})



        
    } catch (error) {
        
    }

}



module.exports = { register };

    





