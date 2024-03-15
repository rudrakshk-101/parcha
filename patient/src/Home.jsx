import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { styled } from '@mui/system'; 
import {Link} from "react-router-dom"

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

function HomePage() {
 return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Link to="/prescriptioncard ">
        <StyledButton variant="contained" color="primary">
          View Prescription
        </StyledButton>
        </Link>
        <Link to="/medicalhistory">
        <StyledButton variant="contained" color="secondary">
          View History
        </StyledButton>
        </Link>
        <StyledButton variant="contained" color="secondary">
          Place Order
        </StyledButton>
      </Box>
    </Container>
 );
}

export default HomePage;
