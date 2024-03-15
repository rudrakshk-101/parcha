const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
