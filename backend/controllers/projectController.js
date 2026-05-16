import Project from '../models/Project.js';   //import mongodb model

// Get all projects
const getProjects = async (req, res) => {   //this function fetch the project 

    // Fetch the data from database
    const projects = await Project.find({})
        .sort({ createdAt: -1 });

    res, json(projects);
};


// Get a single project by ID

const getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id); // fid project by id

    if (project) {
        res.json(project); // if project found send data to json response

    } else {
        res.status(404);
        throw new Error('Project not found');
    }

};


// Create a new Project
const createProject = async (req, res) => {   // create mongodb document 
    //Request body data
    const { title, desc, image, category, tags, demoUrl, githubUrl, } = req.body;   // JSON data come from frontend

    // Create new project instance (object)
    const project = new Project({ title, desc, image, category, tags, deoUrl, githubUrl, });

    // Save project in the database
    const createdProject = await project.save();
    res.status(201).json(createdProject); // send created project data to json response
};


// Delete project
const deleteProject = async (req, res) => {
    // find project by ID 
    const project = await Project.findById(req.params.id);

    if (project) {

        await project.deleteOne(); // delete project from database
        res.json({ message: 'Project removed' });
    }
    else {
        res.status(404);
        throw new Error('Project not found');
    }
};


export { getProject, getProjectById, createProject, deleteProject };



