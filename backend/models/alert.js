const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
