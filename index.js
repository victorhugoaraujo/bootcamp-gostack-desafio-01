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
 * Project detail
 */
server.get('/projects/:index',(req, res) => {
    const { index } = req.params;

    return res.json(projects[index]);
})

/**
 * Create new project
 */
server.post('/projects', (req, res) => {
    const { title } = req.body

    projects.push(title)
    
    return res.json(projects)
})

/**
 * Update Project
 */
server.put('/projects/:index', (req, res) => {
    const  { index } = req.params;
    const { title } = req.body;

    projects[index] = title;

    return res.json(projects)
})

server.delete('/projects/:index', (req, res) => {
    const { index } = req.params;

    projects.splice(index, 1);

    return res.json(projects);
});


server.listen(3000);