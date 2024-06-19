// bitte npm install mongoose-sequence  nicht vergessen 
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Add mongoose-sequence for auto-increment

// Define the structure of termin
const Schema = mongoose.Schema;
const terminSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    object: {
        type: String,
        required: true
    },
    datum: {
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

terminSchema.plugin(AutoIncrement, { inc_field: 'id' }); // Apply auto-increment plugin

const Termin = mongoose.model('Termin', terminSchema);

module.exports = Termin;
