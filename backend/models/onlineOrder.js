const { Schema, model, models } = require('mongoose');

const OnlineOrderSchema = new Schema({
    nameOfPatient: { type: String, required: true },
    name: { type: String, required: true },
    dosageInMg: { type: Number, required: true },
    frequencyPerDay: { type: Number, required: true },
    durationInDays: { type: Number, required: true },
    pharmacist: { type: String, required: true } // Reference to the pharmacist
});


const OnlineOrder = models.OnlineOrder ||  model("OnlineOrder", OnlineOrderSchema);
module.exports = OnlineOrder;