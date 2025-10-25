const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try {
        //step 1 : get token from req headers
        const token = req.headers.authorization;

        //step 2 : Checking the existence of the token
        if(!token)
            return res.status(401).json(
        {message : 'Token is not found!',
              success: false,
        })

        //step 3 : Pure token mining
        const mainToken = token.split(' ')[1];


        
    } catch (error) {
        
    } 

}