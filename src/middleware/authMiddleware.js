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

        //step 4 : verify token with JWT
        const decoded = jwt.verify(mainToken, process.env.JWT_SECRET);

        //step 5 : add data to req.user
        req.user = decoded;

        //step 6 : next
        next()


        
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json(
        {
            success : false,
            message : 'Token has expired.'
        });
        return res.status(401).json(
            {
                success : false,
                message : 'The token is invalid.'
            }
        )
        
    } 

}

module.exports = authMiddleware;