import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { Fade } from '@material-ui/core'; // Assuming you're using Material-UI for the Fade effect
import { Typography, Box, Button } from '@material-ui/core'; // Assuming you're using Material-UI for UI components
import { useHistory } from 'react-router-dom';


// Define your styled components
const BackgroundImageContainer = styled.div`
 width: 100vw;
 height: 100vh;
 position: relative;
`;

const MessageContainer = styled.div`
 /* Add your styles for MessageContainer here */
`;

const StyledButton = styled(Button)`
 margin: 30px; 
`;

// Your component
const YourComponent = ({ showMessage, message, alert, handlePlaceOrder }) => {

  const getLink = ()=>{
    const response = fetch('localhost:3000/api/videocall',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data=response.json();
    history.push(data.url);
  }

 return (
    <div className="homeBackground">
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
        <div>
          <div>
            {alert && (
              <div>
                <h2>{alert.title}</h2>
                <p>{alert.message}</p>
              </div>
            )}
          </div>

          <div className="buttons">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height="auto"
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        width="100%"
        className='boxofbuttons'
      >
        <div className="buttonMargin">
        <Link to="/prescriptioncard">
          <StyledButton variant="contained" color="primary">
            View Prescription
          </StyledButton>
        </Link>
        </div>
        <div className="buttonMargin">
        <Link to="/medicalhistory">
          <StyledButton variant="contained" color="secondary">
            View History
          </StyledButton>
        </Link>
        </div>
        <div className="buttonMargin">
        <StyledButton variant="contained" color="secondary" onClick={handlePlaceOrder}>
          Place Order
        </StyledButton>
        <StyledButton variant="contained" color="secondary" onClick={getLink}>
          Video Appointment
        </StyledButton>
        </div>
      </Box>
    </div>
        </div>
      )}
    </BackgroundImageContainer>
    <div className="backgroundblack"></div>
    </div>
 );
};

export default YourComponent;
