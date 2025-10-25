const bcrypt = require('bcrypt');
const pool = require('../config/database');

const register = async (req,res)=>{
    try {
        //step 1
       const {username , email, password} = await req.body;

       //step 2 - validation
       if (!username || !email || !password)
            return res.status(400).json({error : 'All fields are required!'});


       //step 3
       const [users] = await pool.query(
        'select * from users where email = ? or username = ?',
        [email, username]
       )
       if (users.length > 0 )
        return res.status(400).json({error: 'User already exists!'})

       //step 4 password hashing
       const hashedPassword = await bcrypt.hash(password, 10);









        
    } catch (error) {
        console.error('Register error', error);
        res.status(500).json({error : 'Server error'})
        
    }
}




    




