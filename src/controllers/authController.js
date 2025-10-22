const bcrypt = reuire('bcrypt');
const pool = require('../config/database');

const register = async (req,res) =>{
    const {username, email, password} = req.body;

    //validation
    if (!username || !email || !password)
        return res.status(400).json({error : 'every fileds are required!'});

    pool.query('select * from users where email = ? or username = ?',
        [email, username],
        (error,result) => {
            if (error) 
                return res.status(500).json({error : 'there is an error with database'});

        }




    )




}