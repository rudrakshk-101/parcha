import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';

const useStyles = makeStyles({
 card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    position: 'relative',
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
 date: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 12,
    color: '#666',
 },
 orderButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#3f51b5', // Blue color
    '&:hover': {
      backgroundColor: '#303f9f', // Darker blue on hover
    },
 },
 counter: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
 },
 counterText: {
    fontSize: 14,
    color: '#666',
    transition: 'color 0.3s ease', // Smooth color transition
 },
 counterButton: {
    backgroundColor: '#3f51b5', // Blue color
    '&:hover': {
      backgroundColor: '#303f9f', // Darker blue on hover
    },
 },
 orderMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center',
    animation: '$fadeIn 1s ease-out',
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
});

const PrescriptionCard = () => {
 const classes = useStyles();
 const [prescription, setPrescription] = useState({
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
 });
 const [days, setDays] = useState(1); // Default days for the prescription
 const [orderDispatched, setOrderDispatched] = useState(false);

 const handleOrder = () => {
    setOrderDispatched(true);
 };

 const handleCounterChange = (newDays) => {
    setDays(newDays);
 };

 if (orderDispatched) {
    return (
      <div className={classes.orderMessage}>
        Order Dispatched
      </div>
    );
 }

 return (
    <Card className={classes.card} >
      <CardContent >
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
      <Typography variant="body2" className={classes.date}>
        {format(new Date(), 'MMMM dd, yyyy')}
      </Typography>
      <Button className={classes.orderButton} variant="contained" color="primary" onClick={handleOrder}>
        Order
      </Button>
      <div className={classes.counter}>
        <Typography variant="body2" className={classes.counterText}>
          Days:
          <Button className={classes.counterButton} onClick={() => handleCounterChange((days==1) ? days : days - 1)}>-</Button>
          {days}
          <Button className={classes.counterButton} onClick={() => handleCounterChange((days==7) ? days : days + 1)}>+</Button>
        </Typography>
        
        
      </div>
    </Card>
 );
};

export default PrescriptionCard;
