const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try {
        //step 1 : get token from req headers
        const token = req.headers.authorization;
        
    } catch (error) {
        
    }

}