require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const prof = require('./models/profs');
const Termin = require('./models/termin'); // Import Termin model
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, './assets/img/profspic')));

// connect to the database
connectDB();

app.get('/api/professor/:id', (req, res) => {
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
});

app.get('/api/professor', (req, res) => {
    prof.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Vorschläge für die Professoren
app.get('/api/professor/:name', (req, res) => {
    const prof = profs.find(c => c.name === req.params.name);
    if (!prof) return res.status(404).send('The professor with the given name was not found');
    res.send(prof);
});

// Übersicht von Terminen der Professorens
app.get('/api/professordetail/:id', (req, res) => {
    const prof = profs.find(c => c.id === parseInt(req.params.id));
    if (!prof) return res.status(404).send('The professor with the given ID was not found');
    res.send(prof);
});

app.post('/api/appointments', async (req, res) => {
    const { object, datum, start, ende, studentName, professorName, matrikelNumber, studentEmail } = req.body;

    const termin = new Termin({ object, datum, start, ende, studentName, professorName, matrikelNumber, studentEmail });
    try {
        const result = await termin.save();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/appointments/:id', (req, res) => {
    Termin.findOne({ id: req.params.id })
        .then(appointment => {
            if (!appointment) return res.status(404).send('The appointment with the given ID was not found');
            res.send(appointment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/api/appointments', (req, res) => {
    Termin.find()
        .then(appointments => {
            res.send(appointments);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.delete('/api/appointments/:id', (req, res) => {
    Termin.findOneAndDelete({ id: req.params.id })
        .then(appointment => {
            if (!appointment) return res.status(404).send('The appointment with the given ID was not found');
            res.send(appointment);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
