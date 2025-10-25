// This file created for test authentication

const testAuth = (req, res) => {
    try {
       
        // step 1: get user data from req.user
        const { username, userId, email } = req.user;

        // step 2: send success response with user data
        res.status(200).json({
            success: true,
            message: 'Authentication test was successful!',
            user: {
                id: userId,
                username: username,
                email: email
            }
        });


        
    } catch (error) {
        
    }
}