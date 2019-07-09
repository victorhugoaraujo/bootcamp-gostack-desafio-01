const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let requests = 0;

/**
 * Check if project exists
 */

function checkProjectExists(req, res, next) {
    const  { id } = req.params;
    const project = projects.find(p => p.id === id);

    if(!project) {
        return res.status(400).json({error: 'Project does not exists'})
    }

    return next();
}

/**
 * Request counter
 */
function requestCounter(req, res, next) {
    requests++
    console.log(`Requests so far: ${requests}`);

    return next();
}

server.use(requestCounter);

/**
 * List all projects
 */
server.get('/projects', (req, res) => {
    return res.json(projects)
})
/**
 * Create new project
 */
server.post('/projects', (req, res) => {
    const { id, title } = req.body


    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project)
    
    return res.json(project)
})

/**
 * Update Project
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.title = title
    return res.json(project)
})

/**
 * Delete a project
 */
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const index = projects.find(p => p.id === id)

    projects.splice(index, 1);

    return res.send();
});
/**
 * Create a task
 */

 server.post('/projects/:id/tasks', (req, res) => {
     const { id } = req.params;
     const { title } = req.body;

     const project = projects.find(p => p.id === id)

     project.tasks.push(title);

     return res.json(project)
 })

server.listen(3000)