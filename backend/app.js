require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./server/config/db');
const prof = require('./models/profs');
const Termin = require('./models/termin'); // Import Termin model
const { sendEmail, sendDeletionEmail } = require('./mailer');

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

app.get('/api/professor/:name', (req, res) => {
    const prof = profs.find(c => c.name === req.params.name);
    if (!prof) return res.status(404).send('The professor with the given name was not found');
    res.send(prof);
});

app.get('/api/professordetail/:id', (req, res) => {
    const prof = profs.find(c => c.id === parseInt(req.params.id));
    if (!prof) return res.status(404).send('The professor with the given ID was not found');
    res.send(prof);
});

app.post('/api/appointments', async (req, res) => {
    const { object, datum, start, ende, studentName, professorName, matrikelNumber, studentEmail, raum } = req.body;
    const termin = new Termin({ object, datum, start, ende, studentName, professorName, matrikelNumber, studentEmail, raum });
    try {
        const result = await termin.save();

        const studentText = 'Ihr Termin wurde gebucht.';
        await sendEmail(studentEmail, 'Terminbestätigung', studentText, result);


        const profEmail = 'ilyaserrarhoute@gmail.com';
        const profText = 'Ein neuer Termin wurde gebucht.';
        await sendEmail(profEmail, 'Neue Terminbuchung', profText, result, true);

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/appointments/professor/:professorName', (req, res) => {
    const professorName = req.params.professorName;
    Termin.find({ professorName })
        .then(appointments => {
            res.send(appointments);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await sendEmail(to, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
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

app.delete('/api/appointments/:id', async (req, res) => {
    const appointmentId = req.params.id;
    console.log(`Beim Versuch, einen Termin mit der id zu löschen: ${appointmentId}`);
    try {
        const appointment = await Termin.findOneAndDelete({ id: appointmentId });
        if (!appointment) {
            console.log(`Kein Termin gefunden mit id : ${appointmentId}`);
            return res.status(404).send('Der Termin mit der angegebenen ID wurde nicht gefunden');
        }

 const profEmail = 'ilyaserrarhoute@gmail.com';
        await sendDeletionEmail(profEmail, appointment);

        console.log(`Termin gelöscht mit id: ${appointmentId}`);
        res.send({ message: 'Termin erfolgreich gelöscht' });
    } catch (err) {
        console.error(`Fehler beim Löschen eines Termins mit id: ${appointmentId}`, err);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
