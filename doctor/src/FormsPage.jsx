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
 backgroundColor: "white "
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

function MedicalFormPage() {
 // State to hold form input values
 const [formState, setFormState] = useState({
    phoneNo: '',
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
 });

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
 };

 const handlePhone = async () => {
   let response = await fetch(`http://localhost:3000/api/doctors/start-diagnosis/${encodeURI(formState.phoneNo)}`, {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' },
    });
    let data = await response.json();
    console.log(data);
    
    // Assuming the API response contains the fields to be filled
    setFormState(prevState => ({
      ...prevState,
      name: data.name || '',
      bloodGroup: data.bloodGroup || '',
      age: data.age || '',
      gender: data.gender || '',
      description: data.description || '',
    }));
 };

 const handleSubmit = async () => {
  let response = await fetch(`http://localhost:3000/api/doctors/submit-diagnosis/${encodeURI(formState.phoneNo)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({date:date, description:description, severeity: severity , prescription:prescription}),
   });
   let data = await response.json();
   console.log(data);
   
   // Assuming the API response contains the fields to be filled
   setFormState(prevState => ({
     ...prevState,
     name: data.name || '',
     bloodGroup: data.bloodGroup || '',
     age: data.age || '',
     gender: data.gender || '',
     description: data.description || '',
   }));
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
            label="Phone No."
            variant="outlined"
            margin="normal"
            name="phoneNo"
            value={formState.phoneNo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            margin="normal"
            name="Age"
            value={formState.age}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Blood Group"
            variant="outlined"
            margin="normal"
            name="bloodGroup"
            value={formState.bloodGroup}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Gender"
            variant="outlined"
            margin="normal"
            name="gender"
            value={formState.gender}
            onChange={handleInputChange}
          />
          <StyledButton variant="contained" color="secondary" onClick={handlePhone}>
            Check
          </StyledButton>
        </FormBox>
        <FormBox>
          <Typography variant="h5" gutterBottom>
            Disease Description
          </Typography>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name="description"
            value={formState.description}
            onChange={handleInputChange}
          />
          <Medicine phoneNo={formState.phoneNo} description={formState.description}/>
        </FormBox>
      </FormContainer>
      <Box display="flex" justifyContent="center">
        <Link to="/medicalhistory">
          <ViewHistoryButton variant="contained" color="primary">
            View Patient's Medical History
          </ViewHistoryButton>
        </Link>
      </Box>
    </Container>
 );
}

export default MedicalFormPage;
