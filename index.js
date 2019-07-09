const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
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
server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.title = title
    return res.json(project)
})

/**
 * Delete a project
 */
server.delete('/projects/:id', (req, res) => {
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