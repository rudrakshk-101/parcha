import React, { useState } from 'react';
import { Button, Container, Box, Typography, Fade } from '@mui/material';
import { styled } from '@mui/system'; 
import { Link } from "react-router-dom";

// Styled components for the buttons
const StyledButton = styled(Button)({
 fontSize: '1.5rem',
 padding: '10px 20px',
 margin: '10px',
 borderRadius: '10px',
 textTransform: 'none',
 '&:hover': {
    backgroundColor: '#007bff',
    color: '#fff',
 },
});

// Styled component for the message container
const MessageContainer = styled(Box)({
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 height: '100vh',
 position: 'absolute',
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 backgroundColor: 'rgba(0, 0, 0, 0.5)',
 zIndex: 1000,
});

function HomePage() {
 // Simulate the presence of a prescription and the name of the medical service
 const [hasPrescription, setHasPrescription] = useState(true);
 const [medicalServiceName, setMedicalServiceName] = useState('Medical Service Name');
 const [showMessage, setShowMessage] = useState(false);
 const [message, setMessage] = useState('');

 const handlePlaceOrder = () => {
    if (hasPrescription) {
      setMessage(`Ordered! It will soon be delivered by ${medicalServiceName}.`);
    } else {
      setMessage('You don\'t have a current prescription. Contact your doctor for it.');
    }
    setShowMessage(true);
 };

 return (
    <Container maxWidth="sm">
      {showMessage ? (
        <MessageContainer>
          <Fade in={showMessage}>
            <Typography variant="h6" color="white">
              {message}
            </Typography>
          </Fade>
        </MessageContainer>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Link to="/prescriptioncard">
            <StyledButton variant="contained" color="primary">
              View Prescription
            </StyledButton>
          </Link>
          <Link to="/medicalhistory">
            <StyledButton variant="contained" color="secondary">
              View History
            </StyledButton>
          </Link>
          <StyledButton variant="contained" color="secondary" onClick={handlePlaceOrder}>
            Place Order
          </StyledButton>
        </Box>
      )}
    </Container>
 );
}

export default HomePage;
