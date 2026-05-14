import Admin from '../models/Admin.js';    
import generateToken from '../utils/generateToken.js';


// description: Auth admin & get token
// route: POST /api/auth/login
// access: Public

// LOGIN FUNCTION
const authadmin = async (req, res) => {

    // data comes from frontend
    const { email, password } = req.body;

    // Find admin by email in database
    const admin = await Admin.findOne({ email });

    // Password check
    if (admin && (await admin.matchPassword(password))) {

        res.json({
            _id: admin._id,
            email: admin.email,

            // Generate JWT token and send to frontend
            token: generateToken(admin._id),
        });

    } else {

        res.status(401);

        // when email or password is wrong
        throw new Error('Invalid email or password');
    }
};


// description: Get admin profile
// route: GET /api/auth/verify
// access: Private

const getAdminProfile = async (req, res) => {

    // Find admin by ID and exclude password
    const admin = await Admin.findById(req.admin._id)
        .select('-password');

    if (admin) {

        res.json({
            success: true,

            // frontend gets admin data
            user: admin,
        });

    } else {

        res.status(404);

        // when admin not found
        throw new Error('Admin not found');
    }
};


export {
    authadmin,
    getAdminProfile,
};