// PrescriptionPage.js
import React from 'react';
import PrescriptionCard from './orderrequest'; // Adjust the import path as necessary

const PrescriptionPage = () => {
 // Example data array defined within the same file
 const prescriptions = [
    {
      disease: 'Common Cold',
      medicines: [
        {
          name: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Every 4 hours',
          duration: '3 days',
        },
        {
          name: 'Ibuprofen',
          dosage: '200mg',
          frequency: 'Every 6 hours',
          duration: '3 days',
        },
      ],
    },
    {
      disease: 'Asthma',
      medicines: [
        {
          name: 'Salbutamol',
          dosage: '2mg',
          frequency: 'Every 4 hours',
          duration: '7 days',
        },
      ],
    },
    // Add more prescriptions as needed...
 ];

 return (
    <div className='orders'>
      {prescriptions.map((prescription, index) => (
        <PrescriptionCard key={index} prescription={prescription} />
      ))}
    </div>
 );
};

export default PrescriptionPage;
