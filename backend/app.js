require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const prof= require('./models/profs')
app.use(express.json());
app.use('/images' , express.static(path.join(__dirname, './assets/img/profspic')));

// connect to the database
connectDB();

const existingProf1 =  prof.findOne({ id: 1 });

if (!existingProf1) {
    const prof1 = new prof({
        id: 1,
        titel: 'Prof. Dr.',
        vorname: 'Christian',
        nachname: 'Scheffer',
        telefonnummer: '+492343210334',
        email: 'christian.scheffer@hs-bochum.de',
        raum: 'C6-03',
        imageUrl: '/images/prof4.jpg',
        sprechstunde: [
            { day: 1, start: '09:00', ende: '11:00' }, 
            { day: 2, start: '14:00', ende: '16:00' } 
        ]
    });

    prof1.save();
    console.log('Prof1 sucessfully added !');
} else {
    console.log('prof1 was already added');
}

const existingProf2 =  prof.findOne({ id: 2 });

if (!existingProf2) {
    const prof2 = new prof({
        id: 2,
        titel: 'Prof. Dr. rer. nat.',
        vorname: 'Ursula',
        nachname: 'Oesing',
        telefonnummer: '+492343210334',
        email: 'ursula.oesing@hs-bochum.de',
        raum: 'C5-03',
        imageUrl: '/images/prof3.jpg',
        sprechstunde: [
            { day: 1, start: '12:00', ende: '14:00' }, 
            { day: 2, start: '13:00', ende: '15:00' } 
        ]
    });

    prof2.save();
    console.log('Prof2 sucessfully added !');
} else {
    console.log('prof2 was already added');
}

const existingProf3 = prof.findOne({ id: 3 });

if (!existingProf3) {
    const prof3 = new prof({
        id: 3,
        titel: 'Prof. Dr.-Ing.',
        vorname: 'Carsten',
        nachname: 'Köhn',
        telefonnummer: '+492348910334',
        email: 'carsten.köhn@hs-bochum.de',
        raum: 'C6-02',
        imageUrl: '/images/prof1.jpg',
        sprechstunde: [
            { day: 1, start: '11:00', ende: '13:00' }, 
            { day: 2, start: '10:00', ende: '12:00' } 
        ]
    });

    prof3.save();
    console.log('Prof3 sucessfully added !');
} else {
    console.log('prof3 was already added');
}

const existingProf4 = prof.findOne({ id: 4 });

if (!existingProf4) {
    const prof4 = new prof({
        id: 4,
        titel: 'Prof. Dr. rer. nat.',
        vorname: 'Katrin',
        nachname: 'Brabender',
        telefonnummer: '+492348890334',
        email: 'katrin.brabender@hs-bochum.de',
        raum: 'C5-20',
        imageUrl: '/images/prof5.jpg',
        sprechstunde: [
            { day: 1, start: '10:30', ende: '12:30' }, 
            { day: 2, start: '11:00', ende: '13:00' } 
        ]
    });

    prof4.save();
    console.log('Prof4 sucessfully added !');
} else {
    console.log('prof4 was already added');
}

const existingProf5 = prof.findOne({ id: 5 });

if (!existingProf5) {
    const prof5 = new prof({
        id: 5,
        titel: 'Prof. Dr. rer. nat.',
        vorname: 'Rainer',
        nachname: 'Lütticke',
        telefonnummer: '+492348894534',
        email: 'rainer.luetticke@hs-bochum.de',
        raum: 'C5-21',
        imageUrl: '/images/prof2.jpg',
        sprechstunde: [
            { day: 1, start: '11:30', ende: '13:30' }, 
            { day: 2, start: '10:00', ende: '12:00' } 
        ]
    });
    
    prof5.save();
    console.log('Prof5 sucessfully added !');
} else {
    console.log('prof5 was already added');
}


app.get('/api/professor/:id' , (req, res) => {
    const professorId = req.params.id;
    prof.findOne({ id: professorId })
        .then((professor) => {
            if (!professor) {
                return res.status(404).send('Professor not found');
            }
            res.send(professor);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
})

app.get('/api/professor', (req, res) => {
    prof.find()
        .then((result) => {
            res.send(result) ;
        })
        .catch((err) => {
            console.log(err);
        })
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


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// Path: ProfRest.js