const { Schema, model, models } = require('mongoose');
const Prescription = require("./prescription")

const DescriptionSchema = new Schema({
    date: String,
    description: String,
    severity:  Number, // 0-10 (0  is not an issue at all and 10 means the problem is very severe)
    doctor: String,
    prescription: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }], // Corrected line
});

const Description = models.Description ||  model("Description", DescriptionSchema);
module.exports = Description;