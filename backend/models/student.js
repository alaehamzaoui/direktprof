const mongoose = require('mongoose');

// Define the structure of termin
const Schema = mongoose.Schema;
const terminSchema = new Schema({
    object: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    ende: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    professorName: {
        type: String,
        required: true
    },
    matrikelNumber: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    }
}, { timestamps: true }); // To save the date and time of updates

const Termin = mongoose.model('Termin', terminSchema);

module.exports = Termin;
