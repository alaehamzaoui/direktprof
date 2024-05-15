const mongoose= require('mongoose');

const Schema = mongoose.Schema;
const fachbereichSchema= new Schema({
    name:{
        type: String,
        required: true
    }
});

const fachbereich = mongoose.model('prof' , fachbereichSchema);

module.exports= fachbereich;