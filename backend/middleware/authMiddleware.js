import jwt from 'jsonwebtoken';

// middleware function to protect routes and verify token
const protect = async (req, res, next) => {
    let token;  //token variable for storing token

    // Authrization header check its check header exist or not and  check it bearer token format or not 
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    
    // if token verify then run try block
    try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]; // split the header and get token part [1]:-actual jwt token

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey_change_me_in_prod'); //verify token with secret key

        // Save the admin ID and give to the controller
        req.adminID = decoded.id;  // save the decoded id in req.adminID 

        // move to the next middleware controller
        next();
    } catch (error) {   // when token verification failed then run catch block 
        res.status(401).json({error: 'Not authorized, token failed', });
    }
}


// if token not found
if (!token) {
    res.status(401).json({error: 'Not authorized, no token, '});
}

};

export { protect };