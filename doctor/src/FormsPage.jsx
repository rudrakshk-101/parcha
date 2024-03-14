import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

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

function MedicalFormPage() {
 return (
    <Container maxWidth="lg">
      <FormContainer>
        <FormBox>
          <Typography variant="h5" gutterBottom>
            Patient Details
          </Typography>
          <TextField fullWidth label="Name" variant="outlined" margin="normal" />
          <TextField fullWidth label="Age" variant="outlined" margin="normal" />
          <TextField fullWidth label="Blood Group" variant="outlined" margin="normal" />
          <TextField fullWidth label="Gender" variant="outlined" margin="normal" />
          <StyledButton variant="contained" color="primary">
            Submit
          </StyledButton>
        </FormBox>
        <FormBox>
          <Typography variant="h5" gutterBottom>
            Disease Description
          </Typography>
          <TextField fullWidth label="Description" variant="outlined" margin="normal" multiline rows={4} />
          <TextField fullWidth label="Prescribed Medicine" variant="outlined" margin="normal" />
          <TextField fullWidth label="Dosage" variant="outlined" margin="normal" />
          <TextField fullWidth label="Duration (Days)" variant="outlined" margin="normal" />
          <StyledButton variant="contained" color="secondary">
            Submit
          </StyledButton>
        </FormBox>
      </FormContainer>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <ViewHistoryButton variant="contained" color="primary">
          View Patient's Medical History
        </ViewHistoryButton>
      </Box>
    </Container>
 );
}

export default MedicalFormPage;