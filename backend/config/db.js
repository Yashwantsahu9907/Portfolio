import mongoose from 'mongoose';

// make database connection 
const connectDB = async () => {    // async is used because take a time to connect the database
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);  // await is use for waiting the connection to the database
        console.log(`MongoDB Connected: ${conn.connection.host}`);   

    } catch (error) {
        
        console.error(`Error: ${error.message}`);
        process.exit(1);   // exit when any failure occur like wrong password wrong name etc
    }

};

export default connectDB;