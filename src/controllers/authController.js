const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const register = async (req,res)=>{
    try {
        //step 1 : get values from request body
       const {username , email, password} = req.body;

       //step 2 - validation
       if (!username || !email || !password)
            return res.status(400).json({error : 'All fields are required!'});


       //step 3 : Checking for user existence with Sequelize (refactor with sequelize)
       const existingUser = await User.findOne({
        where : {
            $or :[
                { email : email },
                { username : username }
            ]
        }
       });
       if (existingUser) {
        return res.status(400).json({ error : 'User already exists!'});
       }

       //step 4 : password hashing
       const hashedPassword = await bcrypt.hash(password, 10);


       //step 5 : insert user in database with Sequelize (refactoring)
       const user = await User.create(
        {
            username : username,
            email : email,
            password : hashedPassword
        }
       );

       //step 6 : send a Successful response
       res.status(201).json(
        {
            message : 'User created successfylly',
            userId : user.id
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

        //step 3 : find user with email with sequelize (refactoring)
        const foundUser = await User.findOne(
            {
                where :{
                    email : email
                }
            }
        );
        if (!foundUser){
            return res.status(404).json({error : 'User not found!'});
        };

 
        // step 5 : compare plain password and hashed password
        const passCompare = await bcrypt.compare(password, foundUser.password);
        if (!passCompare)
            return res.status(401).json({error : 'Login faild'});

        // step 6 : create jwt token
        const token = jwt.sign(
            {
                //payload
                userId : foundUser.id,
                username : foundUser.username,
                email : foundUser.email

            },
            // secret key
            process.env.JWT_SECRET,
            //option
            { expiresIn : '24h'}

        );

        //step 7 : send success response
        res.status(200).json(
            {
                message : 'Login successful',
                token : token,
                user :{
                    id : foundUser.id,
                    username : foundUser.username,
                    email : foundUser.email
                }
            }
        );


        
    } catch (error) {
        console.error('Login error', error);
        res.status(500).json({error : 'Server error'});
        
    }

}



module.exports = { register, login };

    