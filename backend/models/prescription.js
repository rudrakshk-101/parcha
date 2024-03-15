const { Schema, model, models } = require('mongoose');

const PrescriptionSchema = new Schema({
    name: { type: String, required: true },
    dosageInMg: { type: String, required: true },
    frequencyPerDay: { type: String, required: true},
    durationInDays: { type: String, required: true},
    valid: { type: Boolean, default: true}
});

const Prescription = models.Prescription ||  model("Prescription", PrescriptionSchema);
module.exports = Prescription;