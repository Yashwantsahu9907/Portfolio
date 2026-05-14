import jwt from 'jsonwebtoken';   // import jwt package for generate token

// function for recieve admin id and generate token
const generateToken = (id) => {

    //jwt.sign create token 
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey_change_me_in_prod', //supersec....:- .env me secret key nhi mila to default use karega
        {
            expiresIn: '30d',  // token expire in 30 days
        }
    );
};

export default generateToken;

