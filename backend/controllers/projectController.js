import Project from '../models/Project.js';   //import mongodb model

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Project fetch error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
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

    const project = new Project({ title, desc, image, category, tags, demoUrl, githubUrl, });

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

// Update project
const updateProject = async (req, res) => {
    const { title, desc, image, category, tags, demoUrl, githubUrl } = req.body;
    
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = title || project.title;
        project.desc = desc || project.desc;
        project.image = image || project.image;
        project.category = category || project.category;
        project.tags = tags || project.tags;
        project.demoUrl = demoUrl || project.demoUrl;
        project.githubUrl = githubUrl || project.githubUrl;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
};

export { getProjects, getProjectById, createProject, deleteProject, updateProject };



