require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
app.use(express.json());

// connect to the database
connectDB();

const profs = [ 
    { id: 1, name: 'prof1' },
    { id: 2, name: 'prof2' },
    { id: 3, name: 'prof3' }
];

app.get('/api/professor', (req, res) => {
 res.send(profs);
});

//Vorschläge für die Professoren
app.get('/api/professor/:name', (req, res) => {
    const prof = profs.find(c => c.name === req.params.name);
    if (!prof) return res.status(404).send('The professor with the given name was not found');
    res.send(prof);
} );

//Übersicht von Terminen der Professorens
app.get('/api/professordetail/:id', (req, res) => {   
    const prof = profs.find(c => c.id === parseInt(req.params.id));
    if (!prof) return res.status(404).send('The professor with the given ID was not found');
    res.send(prof);
});

const appoitments = [
    { id: 1, name: 'appoitment1'  },
    { id: 2, name: 'appoitment2' },
    { id: 3, name: 'appoitment3' }
];

app.post('/api/appoitments', (req, res) => {
    const appoitment = {
        id: appoitments.length + 1,
        name: req.body.name
    };
    appoitments.push(appoitment);
    res.send(appoitment);
});

app.delete('/api/appoitments/:id', (req, res) => {
    const appoitment = appoitments.find(c => c.id === parseInt(req.params.id));
    if (!appoitment) return res.status(404).send('The appoitment with the given ID was not found');
    const index = appoitments.indexOf(appoitment);
    appoitments.splice(index, 1);
    res.send(appoitment);
});
app.get('/api/appoitments/:id', (req, res) => {
    const appoitment = appoitments.find(c => c.id === parseInt(req.params.id));
    if (!appoitment) return res.status(404).send('The appoitment with the given ID was not found');
    res.send(appoitment);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// Path: ProfRest.js