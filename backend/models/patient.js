const { Schema, model, models } = require('mongoose');
const Description = require("./description")

const PatientSchema = new Schema({
    number:{
        type: String, 
        required: true,
        unique: [true, "This patient number is already in use."],
    },
    email:{
        type: String,
        unique: [true, 'Email already in use'],
        required: [true, 'Please provide an Email']
    },
    name:{
        type: String,
        required: [true, 'Please provide a name'],
    },
    age:{
        type: Number,
        required: [true,'Age field cannot be empty']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female' ],
        required: [true,'Gender field cannot be empty'],
        default:'Not specified'
    },
    bloodGroup: {
        type: String,
        required: [true,'Blood Group field cannot be empty']
    },
    description: {
        description: [{ type: Schema.Types.ObjectId, ref: 'Description' }], // Corrected line
    }
});

const Patient = models.Patient ||  model("Patient", PatientSchema);
module.exports = Patient;