const mongoose= require('mongoose');

//define the struture of termin
const Schema = mongoose.Schema;
const terminSchema= new Schema({
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
} , {timestamps: true}) //to save the date and the time of updates

const termin = mongoose.model('prof' , terminSchema);

module.exports= termin;