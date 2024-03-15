import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import "./MedicalHistoryCard.css";

function MedicalHistoryPage() {
 // Static medical history entries
 const medicalHistory = [
    {
      description: 'Flu Shot',
      prescribedMedicine: 'Flu Vaccine',
      dosage: '1 shot',
      duration: '1 year',
    },
    {
      description: 'Annual Checkup',
      prescribedMedicine: 'None',
      dosage: 'None',
      duration: 'Annual',
    },
    {
      description: 'High Blood Pressure',
      prescribedMedicine: 'Lisinopril',
      dosage: '10mg daily',
      duration: '6 months',
    },
 ];

 return (
    <Grid className='medicalouterdiv' container spacing={2}>
      {medicalHistory.map((entry, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card className='medicalCard'>
            <CardContent>
              <Typography variant="h5" component="div">
                {entry.description}
              </Typography>
              <Typography variant="body2">
                Prescribed Medicine: {entry.prescribedMedicine}
              </Typography>
              <Typography variant="body2">
                Dosage: {entry.dosage}
              </Typography>
              <Typography variant="body2">
                Duration: {entry.duration}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
 );
}

export default MedicalHistoryPage;
