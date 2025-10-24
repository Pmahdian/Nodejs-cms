const bcrypt = reuire('bcrypt');
const pool = require('../config/database');

const register = async (req,res) =>{
    const {username, email, password} = req.body;

    //validation
    if (!username || !email || !password)
        return res.status(400).json({error : 'every fileds are required!'});

    pool.query('select * from users where email = ? or username = ?',
        [email, username],
        (error,results) => {
            if (error) {
                return res.status(500).json({error : 'there is an error with database'});

        }
            // اگر results.length > 0 یعنی کاربر وجود داره
    
            if (results.length > 0){
                return res.status(400).json({error : 'ther user already existed!'})
            }
        })


            bcrypt.hash(password,10, (err, hashedPassword)=>{
                if (err)
                    return res.status(500).json({error : 'there is an error with pasword hashing'});




                pool.query(
                    'insert into users(username, email, password) values(?, ?, ?)', 
                    [username, email, hashedPassword],
                    (error, results) =>{
                        if (error){
                            return res.status(500).json({error : 'There is an error with inserting user'});}

                        res.status(201).json({message : 'insesrting was successful', userId : results.userId})    
                    }

                )
            })
    
    




    




}
