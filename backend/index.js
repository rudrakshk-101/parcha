const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const Meeting = require("./models/meeting");


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/parchdb");

const Token = require('./models/token'); // Adjust the path as necessary

// Import routes here
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const pharmacistRoutes = require('./routes/pharmacistRoutes');

// Use the route modules with the Express application
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/pharmacists', pharmacistRoutes);
app.post('/api/sendinvite', async (req, res) => {
    const { url } = req.body;
    try {
        const meeting = new Meeting({ url });
        await meeting.save();
        console.log(`Invite sent with URL: ${url}`);
        res.status(200).json({ message: 'Invite sent successfully' });
    } catch (error) {
        console.error('Error saving invite:', error);
        res.status(500).json({ error: 'An error occurred while saving the invite' });
    }
});
   
app.get('/api/videocall', async (req, res) => {
    try {
        // Generate a random link
        const videoCallLink = `https://example.com/videocall/${Math.random().toString(36).substring(2, 15)}`;
        const meeting = new Meeting({ url: videoCallLink });
        await meeting.save();
        res.status(200).json({ url: videoCallLink });
    } catch (error) {
        console.error('Error generating video call link:', error);
        res.status(500).json({ error: 'An error occurred while generating the video call link' });
    }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
