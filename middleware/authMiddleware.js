const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try {
        //step 1 : get token from req headers
        const token = req.headers.authorization;

        //step 2 : Checking the existence of the token
        if(!token)
            return res.status(401).json({error : 'Token is not found!'})

        
        
    } catch (error) {
        
    }

}