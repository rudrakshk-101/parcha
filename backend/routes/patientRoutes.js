// doctorRoutes.js
const express = require('express');
const router = express.Router();
//allModelsJustInCase
const Doctor = require('../models/doctor')
const Appoinment = require('../models/appoinment')
const CurrentPatient = require('../models/currentPatient')
const Patient = require('../models/patient')
const Description = require('../models/description')
const Prescription = require('../models/prescription')
const Pharmacist = require('../models/pharmacist')
const OnlineOrder = require('../models/onlineOrder')
const Alert = require("../models/alert");

// Define a route to get all doctors
router.post('/create-profile', async (req, res) => {
    try {
        const { number, email, name, age, gender, bloodGroup } = req.body;

        // Check if a patient with the same number already exists
        const existingPatient = await Patient.findOne({ number });
        if (existingPatient) {
            return res.status(400).json({ message: 'A patient with this number already exists.' });
        }

        // Create a new Patient document
        const newPatient = new Patient({
            number,
            email,
            name,
            age,
            gender,
            bloodGroup,
            description: { description: [] } // Initialize the description field as an empty array
        });

        // Save the new Patient document
        await newPatient.save();

        res.json({ message: 'Profile created successfully', patient: newPatient });
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

router.post('/make-appointment', async (req, res) => {
    try {
        const { doctorId, date, time, patientName, patientNumber } = req.body;

        // Find the doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if the slot is available
        const slotExists = doctor.appoinments.some(appoinment => appoinment.date === date && appoinment.time === time);
        if (slotExists) {
            return res.status(400).json({ message: 'The slot is not available.' });
        }

        // Create a new Appoinment document
        const newAppoinment = new Appoinment({
            date,
            time,
            doctor: doctorId, // Link the appointment to the doctor
            patientName,
            patientNumber
        });

        // Save the new Appoinment document
        await newAppoinment.save();

        // Add the new appoinment's ObjectId to the doctor's appoinments array
        doctor.appoinments.push(newAppoinment._id);
        await doctor.save();

        res.json({ message: 'Appointment made successfully', appoinment: newAppoinment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// router.post('/make-online-order', async (req, res) => {
//     try {
//         const { pharmacistNumber, patientNumber } = req.body;

//         // Find the patient and populate the description field
//         const patient = await Patient.findOne({ number: patientNumber }).populate('description.description');
//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         // Find the pharmacist
//         const pharmacist = await Pharmacist.findOne({ number: Number(pharmacistNumber) });
//         if (!pharmacist) {
//             return res.status(404).json({ message: 'Pharmacist not found' });
//         }

//         const validMedicines = [];

// // Assuming patient.description.description[0].prescription is an array of prescription IDs
// const prescriptionIds = patient.description.description[0].prescription;

// // Use map to create an array of promises
// const prescriptionPromises = prescriptionIds.map(async (id) => {
//     const pres = await Prescription.findById(id);
//     if (pres.valid) {
//         return pres;

//     }
// });

// // Use Promise.all to wait for all promises to resolve
// Promise.all(prescriptionPromises).then((validPrescriptions) => {
//     // Filter out any undefined values (in case a prescription was not valid)
//     validMedicines.push(...validPrescriptions.filter(pres => pres !== undefined));
//     console.log(validMedicines); // This will now log the array with valid prescriptions
// });



//         if (validMedicines.length === 0) {
//             return res.status(400).json({ message: 'No valid medicines in the prescription.' });
//         }

//         // Create a new OnlineOrder document for each valid medicine
//         const newOrders = validMedicines.map(async (prescription) => {
//             const order = new OnlineOrder({
//                 nameOfPatient: patient.name,
//                 name: prescription.name,
//                 dosageInMg: prescription.dosageInMg,
//                 frequencyPerDay: prescription.frequencyPerDay,
//                 durationInDays: prescription.durationInDays,
//                 pharmacist: pharmacist._id.toString() // Convert ObjectId to string
//             });
//             // Set the "valid" field to false for the medicines in the prescription
//             prescription.valid = false;
//             await prescription.save(); // Save the updated prescription
//             return order;
//         });

//         // Save the new OnlineOrder documents
//         await Promise.all(newOrders.map(order => order.save()));

//         // Add the new orders to the pharmacist's onlineOrder array
//         pharmacist.onlineOrders = [...pharmacist.onlineOrders, ...newOrders.map(order => order._id)];
//         await pharmacist.save();

//         res.json({ message: 'Online order made successfully', orders: newOrders });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/alert', async (req, res) => {
    try {
        const alert = await Alert.findOne().sort({ createdAt: -1 }); // Fetch the latest alert
        res.json(alert);
    } catch (error) {
        console.error('Error fetching alert:', error);
        res.status(500).json({ error: 'An error occurred while fetching the alert' });
    }
});

// Export the router
module.exports = router;
