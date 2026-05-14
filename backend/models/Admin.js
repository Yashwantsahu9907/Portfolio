import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';     // bcryptjs is used for password hashing

const adminSchema = new mongoose.Schema({    // schema create for admin 

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
});

// 

adminSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare( enteredPassword, this.password  );  // compare entered password with hashed password  this.password:- database hashed password
};

// before saving the admin to the database hash the password
adminSchema.pre('save', async function (next) {

    //skip if password is not modified
    if (!this.isModified('password')) {
        next();
    }

    //salt generate for more secure hasing 
    const salt = await bcrypt.genSalt(10);

    // actual has the password
    this.password = await bcrypt.hash(this.password, salt);

    
});

const Admin = mongoose.model('Admin', adminSchema);  // model create for admin 

export default Admin;

