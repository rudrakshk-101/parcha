const { Schema, model, models } = require('mongoose');
const Appoinment = require("./appoinment")
const CurrentPatient = require("./currentPatient")

const DoctorSchema = new Schema({
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: String, required: true },
    address: { type: String, required: true },
    appoinments: [{ type: Schema.Types.ObjectId, ref: 'Appoinment' }], // Corrected line
    ongoingTreatment: [{ type: Schema.Types.ObjectId, ref: 'CurrentPatient' }]
});

const Doctor = models.Doctor ||  model("Doctor", DoctorSchema);

module.exports = Doctor ;