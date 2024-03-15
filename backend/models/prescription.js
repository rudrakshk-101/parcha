const { Schema, model, models } = require('mongoose');

const PrescriptionSchema = new Schema({
    name: { type: String, required: true },
    dosageInMg: { type: Number, required: true },
    frequencyPerDay: { type: Number, required: true},
    durationInDays: { type: Number, required: true},
    valid: { type: Boolean, default: true}
});

const Prescription = models.Prescription ||  model("Prescription", PrescriptionSchema);
module.exports = Prescription;