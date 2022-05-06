const {Schema, model} = require('mongoose');

const administratorSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    vaccine : {
        type : String,
        required : true
    },
    dateAdministered : {
        type : Date,
        required : false
    },
    brand : {
        type : String,
        required : true
    },
    hospital : {
        type : String,
        required : true
    },
})

const AdministratorModel = model('Administrator', administratorSchema);
module.exports = AdministratorModel;