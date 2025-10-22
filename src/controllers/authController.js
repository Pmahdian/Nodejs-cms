const bcrypt = reuire('bcrypt');
const pool = require('../config/database');

const register = async (req,res) =>{
    const {username, email, password} = req.body;

    //validation
    if (!username || !email || !password)
        return res.status(400).json({error : 'every fileds are required!'});

    


}