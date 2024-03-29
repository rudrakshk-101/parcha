import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
 form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingTop: '10px',
    paddingBottom: '2vh',
    borderRadius: '10px',
    marginBottom: '5vh',
 },
 button: {
    marginTop: '20vh',
 },
});


const PharmacistForm = () => {
    const navigateTo = useNavigate();
 const classes = useStyles();
 const [phoneNumber, setPhoneNumber] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phone Number:', phoneNumber);
    navigateTo("/prescriptioncard");
    // Here you can handle the submission, e.g., send the phone number to a server
 };

 return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Pharmacist Request
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" onSubmit={handleSubmit} className={classes.button}style={{marginTop:8}}>
          Submit
        </Button>
      </form>
    </Container>
 );
};

export default PharmacistForm;
