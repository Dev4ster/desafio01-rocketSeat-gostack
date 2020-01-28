const express = require('express');

const app = express();

app.use(express.json());


app.use((req, res , next) =>{
    console.count("Número de requisições");
    return next();
})

const projects = [];

function checkProjectId( req , res , next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    if(!project) return res.status(400).json({message:"project not found with id "+id});
    return next();
}

app.post('/projects', (req, res) =>{
    const { id , title } = req.body;
    projects.push({
        id,
        title,
        tasks: []
    });
    res.json(projects);
});

app.get('/projects', (req, res) => {
    res.json(projects);
});


app.put('/projects/:id', checkProjectId , (req, res) => {
    const { body: { title }, params:{ id } } =  req;
    const project = projects.find(p => p.id == id);
    project.title = title;
    return res.json(projects);
});

app.delete('/projects/:id', checkProjectId, (req, res) => {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    projects.splice(project, 1);
    res.send();
});

app.post('/projects/:id/tasks' , checkProjectId, (req, res) => {
    const { body:{ title }, params:{ id} } = req;
    const project = projects.find(p => p.id == id);
    project.tasks.push(title);
    res.json(project);
});

app.listen(3030);