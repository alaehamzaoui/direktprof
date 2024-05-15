const mongoose= require('mongoose');

//define the struture of students
const Schema = mongoose.Schema;
const studentSchema= new Schema({
    vorname: {
        type: String,
        required: true 
    },
    nachname: {
        type: String,
        required: true 
    },
    matrikelnummer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
} , {timestamps: true}) //to save the date and the time of updates

const student = mongoose.model('prof' , studentSchema);

module.exports= student;