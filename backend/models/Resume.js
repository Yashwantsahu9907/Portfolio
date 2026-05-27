import mongoose from 'mongoose';  // import MongoDB schema

const resumeSchema = new mongoose.Schema(
    {
        // store path of uploaded PDF
        url: {
            type: String,
            required: true,
        },

        //upload original uploaded file name
        originalName: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
