const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    next();
});
const profs = [ 
    { id: 1, name: 'prof1', email : 'email1', phone : 'phone1', office : 'office1', officehours : 'officehours1'},
    { id: 2, name: 'prof2', email : 'email2', phone : 'phone2', office : 'office2', officehours : 'officehours2'},
    { id: 3, name: 'prof3', email : 'email3', phone : 'phone3', office : 'office3', officehours : 'officehours3'},
    { id: 4, name: 'prof4', email : 'email4', phone : 'phone4', office : 'office4', officehours : 'officehours4'},

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