const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    date: String,
    time: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patientName: String,
    patientNumber: String
});

module.exports = mongoose.model('Appoinment', AppoinmentSchema);
