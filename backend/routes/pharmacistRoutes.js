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

// Define a route to get all doctors
// router.get('/get-online-orders/:pharmacistId', async (req, res) => {
//     try {
//         const { pharmacistId } = req.params;

//         // Find the pharmacist
//         const pharmacist = await Pharmacist.findById(pharmacistId).populate('onlineOrders');
//         if (!pharmacist) {
//             return res.status(404).json({ message: 'Pharmacist not found' });
//         }

//         // Return the pharmacist's online orders
//         res.json(pharmacist.onlineOrders);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.post('/create-pharmacist-profile', async (req, res) => {
        try {
            const { name, email, number, address } = req.body;
    
            // Check if a pharmacist with the same email or number already exists
            const existingPharmacist = await Pharmacist.findOne({ $or: [{ email }, { number }] });
            if (existingPharmacist) {
                return res.status(400).json({ message: 'A pharmacist with this email or number already exists.' });
            }
    
            // Create a new Pharmacist document
            const newPharmacist = new Pharmacist({
                name,
                email,
                number,
                address,
                onlineOrders: [] // Initialize the onlineOrders array
            });
    
            // Save the new Pharmacist document
            await newPharmacist.save();
    
            res.json({ message: 'Pharmacist profile created successfully', pharmacist: newPharmacist });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

router.put('/complete-order/:patientNumber', async (req, res) => {
    try {
        const { patientNumber } = req.params;
        const patient = await Patient.findOne({ number: patientNumber }).populate('description.description');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        patient.description.description.forEach((desc) => {
            const presIdArray =  desc.prescription;
            presIdArray.forEach(async(id) => {
                const prescription = await Prescription.findById(id);
                prescription.valid = false;
                await prescription.save();
            })
        });

        // Save the updated patient document
        await patient.save();

        res.json({ message: 'Order completed successfully', patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.put('/complete-online-order/:orderId', async (req, res) => {
//     try {
//         const { orderId } = req.params;

//         // Find the pharmacist
//         const pharmacist = await Pharmacist.findOne({ onlineOrders: orderId });
//         if (!pharmacist) {
//             return res.status(404).json({ message: 'Order not found or pharmacist not associated with this order.' });
//         }

//         // Remove the order from the pharmacist's onlineOrders array
//         pharmacist.onlineOrders.pull(orderId);

//         // Save the updated pharmacist document
//         await pharmacist.save();

//         res.json({ message: 'Online order completed successfully', pharmacist });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Export the router
module.exports = router;
