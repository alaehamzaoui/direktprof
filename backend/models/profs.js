const mongoose= require('mongoose');

//define the struture of profs
const Schema = mongoose.Schema;
const profSchema= new Schema({
    id: {
        type: Number,
        required: true 
    },
    titel: {
        type: String,
        required: true 
    },
    vorname: {
        type: String,
        required: true 
    },
    nachname: {
        type: String,
        required: true 
    },
    telefonnummer: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    raum: {
        type: String,
        required: true 
    },
    imageUrl: {
        type: String,
        required: true 
    },
    sprechstunde:[{
        day:{
            type: Number,
            required: true 
        },
        start:{
            type: String,
            required: true 
        },
        ende:{
            type: String,
            required: true 
        }


    }]
} , {timestamps: true}); //to save the date and the time of updates

const prof= mongoose.model('prof' , profSchema);

module.exports= prof;