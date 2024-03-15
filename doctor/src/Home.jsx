import React, { useState } from 'react';
import { Button, Container, Box, Typography, Fade } from '@mui/material';
import { styled } from '@mui/system'; 
import { Link } from "react-router-dom";

// Styled components for the buttons
const StyledButton = styled(Button)({
 fontSize: '1rem',
//  padding: '10px 20px',
 margin: '10px',
 borderRadius: '10px',
 textTransform: 'none',
 backgroundColor: 'green', // Set the background color to green
 color: 'white', // Ensure the text color is white for better contrast
 '&:hover': {
    backgroundColor: 'darkgreen', // Optionally, change the background color on hover for a better user experience
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

// Styled component for the background image
const BackgroundImageContainer = styled(Container)({
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 height: '100vh', // Ensure the container covers the entire viewport height
 position: 'relative',
 width: '100vw', // Ensure the container covers the entire viewport width
});

// Adjusted Styled component for the appointments box
const AppointmentsBox = styled(Box)({
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'center',
 alignItems: 'center',
 padding: '20px',
 backgroundColor: '#f5f5f5',
 borderRadius: '10px',
 boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
 flexGrow: 0, // Prevents the box from growing beyond its content's size
 flexShrink: 0, // Prevents the box from shrinking beyond its content's size
 minWidth: '300px', // Ensures the box doesn't become too narrow
});

// Styled component for each appointment
const Appointment = styled(Box)({
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
 width: '100%',
 padding: '10px',
 marginBottom: '10px',
 borderRadius: '5px',
 backgroundColor: '#e0e0e0',
 boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
 '&:hover': {
    backgroundColor: '#d0d0d0',
    cursor: 'pointer',
 },
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

 // Sample appointments data
 const appointments = [
   { patientName: 'John Doe', date: '2023-04-15', time: '10:00 AM' },
   { patientName: 'Jane Smith', date: '2023-04-16', time: '2:00 PM' },
   // Add more appointments as needed
 ];

 return (
    <BackgroundImageContainer>
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
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start" // Aligns children at the start of the cross axis
          height="100vh"
          padding="20px"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            width="50%"
          >
            <Link to="/prescribing">
              <StyledButton variant="contained" color="primary">
                Start Diagnosis
              </StyledButton>
            </Link>
            <Link to="/prescriptionupdate">
              <StyledButton variant="contained" color="secondary">
                Update Prescription
              </StyledButton>
            </Link>
            <Link to="/videocall">
              <StyledButton variant="contained" color="secondary">
                Start Call with Patient
              </StyledButton>
            </Link>
          </Box>
          <AppointmentsBox>
            {appointments.map((appointment, index) => (
              <Fade in={true} key={index}>
                <Appointment>
                 <Typography variant="body1">{appointment.patientName}</Typography>
                 <Typography variant="body2">{appointment.date} - {appointment.time}</Typography>
                </Appointment>
              </Fade>
            ))}
          </AppointmentsBox>
        </Box>
      )}
    </BackgroundImageContainer>
 );
}

export default HomePage;
