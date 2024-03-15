import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import Medicine from "./repeatingForm";

// Styled components for the forms and buttons
const FormContainer = styled(Box)({
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
 flexWrap: 'wrap',
 gap: '20px',
 padding: '20px',
});

const FormBox = styled(Box)({
 flex: '1 1 45%',
 minWidth: '300px',
 padding: '20px',
 borderRadius: '10px',
 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
 fontSize: '1.2rem',
 padding: '10px 20px',
 marginTop: '20px',
 borderRadius: '10px',
 textTransform: 'none',
 '&:hover': {
    backgroundColor: '#007bff',
    color: '#fff',
 },
});

const ViewHistoryButton = styled(Button)({
 fontSize: '1.2rem',
 padding: '10px 20px',
 marginTop: '20px',
 borderRadius: '10px',
 textTransform: 'none',
 backgroundColor: '#007bff',
 color: '#fff',
 '&:hover': {
    backgroundColor: '#0056b3',
    color: '#fff',
 },
});

function PrescriptionUpdate() {
 const [userDetails, setUserDetails] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    gender: '',
 });
 const [phoneNumber, setPhoneNumber] = useState('');

 // Mock function to simulate fetching user details
 const fetchUserDetails = (phoneNumber) => {
    // Simulate an API call
    setTimeout(() => {
      setUserDetails({
        name: 'John Doe',
        age: '30',
        bloodGroup: 'O+',
        gender: 'Male',
      });
    }, 1000);
 };

 const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
    fetchUserDetails(phoneNumber);
 };

 return (
    <Container maxWidth="lg">
      <FormContainer>
        <FormBox>
          <Typography variant="h5" gutterBottom>
            Patient Details
          </Typography>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={userDetails.name}
            disabled
          />
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            margin="normal"
            value={userDetails.age}
            disabled
          />
          <TextField
            fullWidth
            label="Blood Group"
            variant="outlined"
            margin="normal"
            value={userDetails.bloodGroup}
            disabled
          />
          <TextField
            fullWidth
            label="Gender"
            variant="outlined"
            margin="normal"
            value={userDetails.gender}
            disabled
          />
        </FormBox>
        <FormBox>
          <Typography variant="h5" gutterBottom>
            Disease Description
          </Typography>
          <TextField fullWidth label="Description" variant="outlined" margin="normal" multiline rows={4} />
          <Medicine />
          <StyledButton variant="contained" color="secondary">
            Submit
          </StyledButton>
        </FormBox>
      </FormContainer>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Link to="/medicalhistory">
          <ViewHistoryButton variant="contained" color="primary">
            View Patient's Medical History
          </ViewHistoryButton>
        </Link>
      </Box>
    </Container>
 );
}

export default PrescriptionUpdate;
