import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';

const useStyles = makeStyles({
 // Styles remain the same...
});

const PrescriptionCard = ({ prescription }) => {
 const classes = useStyles();
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
