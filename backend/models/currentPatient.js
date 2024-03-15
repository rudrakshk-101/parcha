const { Schema, model, models } = require('mongoose');

const CurrentPatientSchema = new Schema({
   name: String,
   number: String
});

const CurrentPatient = models.CurrentPatient ||  model("CurrentPatient", CurrentPatientSchema);
module.exports = CurrentPatient;