const { Schema, model, models } = require('mongoose');
const OnlineOrder = require("./onlineOrder")

const PharmacistSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: Number, unique: true, required: true },
    address: { type: String, required: true },
    onlineOrders: [{ type: Schema.Types.ObjectId, ref: 'OnlineOrder' }] // Reference to OnlineOrder documents
});


const Pharmacist = models.Pharmacist ||  model("Pharmacist", PharmacistSchema);
module.exports = Pharmacist;