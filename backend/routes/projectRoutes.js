import express from 'express';

import {
    getProjects, getProjectById, createProject, deleteProject, updateProject     //import project controller

} from '../controllers/projectController.js';

import { protect } from '../middleware/authMiddleware.js';   //JWT token verify only admin can access project routes

// Create router
const router = express.Router();
router.route('/')  // Get all project and create new projects  it allow multiple http method in single route

    // Get /api/project - Get all project
    .get(getProjects)

    // Post /api/project - Create new project
    .post(protect, createProject);   //protect middleware to verify token before creating project

//Routes for single project
router.route('/:id') //for single project by unique id

    .get(getProjectById) // get /api/project/:id - get project by id 
    
    .put(protect, updateProject) // update project route

    .delete(protect, deleteProject);



export default router;


