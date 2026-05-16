import mongoose from 'mongoose';  // mongoose interact with mongodb

// create Schema for project
const projectSchema = new mongoose.Schema(
    {
        title: { 
type: String,
required: true, },

desc: {
    type: String,
    required: true,   // mandatory to field value 
},

image: {
    type: String,
    required: true,
},

category: {
    type: String,
    required: true,
},

tags: [String], //array of string for project tags

demoUrl: {
    type: String,
},

githubUrl: {
    type: String,
},
        
    },

    {
        timeStamps: true, // add createdat and updatedat field in the database automatically
    }
);

// Create model for project  model:- database perform operation 

const Project = mongoose.model('Project', projectSchema);

export default Project;
