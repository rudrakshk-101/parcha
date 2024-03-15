import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';

const useStyles = makeStyles({
 card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    animation: '$fadeIn 1s ease-out',
    position: 'relative', // Added to position the date absolutely
 },
 '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
 },
 title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 16,
 },
 medicine: {
    marginBottom: 16,
 },
 medicineName: {
    fontWeight: 600,
    marginBottom: 8,
 },
 medicineDetails: {
    fontSize: 14,
    color: '#666',
 },
 date: { // Style for the date
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 12,
    color: '#666',
 },
});

const PrescriptionCard = () => {
 const classes = useStyles();

 // Static prescription data
 const prescription = {
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
 };

 // Format the current date
 const currentDate = format(new Date(), 'MMMM dd, yyyy');

 return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="div" className={classes.title}>
          Prescription Details
        </Typography>
        <Typography variant="body1" className={classes.medicine}>
          <span className={classes.medicineName}>{prescription.disease}</span>
          <br />
          <span className={classes.medicineDetails}>Description of the disease</span>
        </Typography>
        {prescription.medicines.map((medicine, index) => (
          <Box key={index} className={classes.medicine}>
            <span className={classes.medicineName}>{medicine.name}</span>
            <br />
            <span className={classes.medicineDetails}>
              Dosage: {medicine.dosage} - Frequency: {medicine.frequency} - Duration: {medicine.duration}
            </span>
          </Box>
        ))}
      </CardContent>
      {/* Display the date */}
      <Typography variant="body2" className={classes.date}>
        {currentDate}
      </Typography>
    </Card>
 );
};

export default PrescriptionCard;
