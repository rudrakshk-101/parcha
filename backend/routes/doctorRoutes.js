// doctorRoutes.js
const express = require('express');
const router = express.Router();
//allModelsJustInCase
const Doctor = require("../models/doctor");
const Appoinment = require('../models/appoinment');
const CurrentPatient = require('../models/currentPatient');
const Patient = require('../models/patient');
const Description = require('../models/description');
const Prescription = require('../models/prescription');
const Pharmacist = require('../models/pharmacist');
const OnlineOrder = require('../models/onlineOrder');

// Define a route to get all doctors
router.post('/create-doctor-profile', async (req, res) => {
    try {
        const { name, speciality, phoneNumber, age, experience, address } = req.body;

        // Check if a doctor with the same phone number already exists
        const existingDoctor = await Doctor.findOne({ phoneNumber });
        if (existingDoctor) {
            return res.status(400).json({ message: 'A doctor with this phone number already exists.' });
        }

        // Create a new Doctor document
        const newDoctor = new Doctor({
            name,
            speciality,
            phoneNumber,
            age,
            experience,
            address,
            appoinments: [], // Initialize the appoinments array
            ongoingTreatment: [] // Initialize the ongoingTreatment array
        });

        // Save the new Doctor document
        await newDoctor.save();

        res.json({ message: 'Doctor profile created successfully', doctor: newDoctor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/start-diagnosis/:phoneNumber', async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const patient = await Patient.findOne({ number: phoneNumber });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Select only the required fields
        const { name, age, gender, bloodGroup } = patient;

        res.json({ name, age, gender, bloodGroup });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/submit-diagnosis/:phoneNumber', async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const { diagnosisDescription, prescription, severity } = req.body; // Include severity in the request body

        // Find the patient
        const patient = await Patient.findOne({ number: phoneNumber });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create new Prescription documents and save them
        console.log(prescription); // Log the prescription array before saving
        const prescriptionDocs = await Promise.all(prescription.map(p => new Prescription(p).save()));
        console.log(prescriptionDocs); // Log the prescriptionDocs array after saving
        
        // Create a new Description document
        const newDescription = new Description({
            date: new Date().toISOString(), // Current date and time
            description: diagnosisDescription,
            // doctor: req.user.name, // Assuming you have user authentication and req.user contains the doctor's information
            severity: severity, // Include the severity in the Description document
            prescription: prescriptionDocs.map(doc => doc._id) // Use the _id of the saved Prescription documents
        });

        // Save the new Description document
        await newDescription.save();

        // Add the new Description to the patient's description array
        patient.description.description.push(newDescription);
        await patient.save();

        res.json({ message: 'Diagnosis and prescription submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/get-medical-history/:phoneNumber', async (req, res) => {
    try {
        const { phoneNumber } = req.params;

        // Find the patient
        const patient = await Patient.findOne({ number: phoneNumber }).populate('description.description');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Return the patient's medical history
        res.json(patient.description.description);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.put('/update-prescription/:phoneNumber', async (req, res) => {
//     try {
//         const { phoneNumber } = req.params;
//         const { descriptionId, updatedPrescription } = req.body;


//         // Find the patient
//         const patient = await Patient.findOne({ number: phoneNumber }).populate('description.description');
//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         patient.description.description[0].prescription.forEach(async (id) => {
//             const presc = await Prescription.findById(id);

//         })

//         // Return the updated Description document
//         res.json();
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/get-appointments/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Find the doctor and populate the appointments, including patient details
        const doctor = await Doctor.findById(doctorId).populate({
            path: 'appoinments',
            populate: {
                path: 'patientName',
                select: 'Name Number' // Adjust the fields as needed
            }
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Return the doctor's appointments with patient details
        res.json(doctor.appoinments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Export the router
module.exports = router;
