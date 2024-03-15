import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import { styled } from '@mui/system';
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
 root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
 },
 button: {
    margin: theme.spacing(1)
 }
}));

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

const Medicine = ({ phoneNo }) => {
 const classes = useStyles();
 const [inputFields, setInputFields] = useState([
    { name: "", dosage: "", frequencyPerDay: "", durationInDays: "" }
 ]);
 const [description, setDescription] = useState("");
 const severity = 1; // Assuming severity is a constant value

 const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      diagnosisDescription: description,
      prescription: inputFields,
      severity: severity
    };

    try {
      const response = await fetch(`http://localhost:3000/api/doctors/submit-diagnosis/${phoneNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    }
     catch (error) {
      console.error('Error:', error);
    }
 };

 const handleAddFields = () => {
    setInputFields([...inputFields, { name: "", dosage: "", frequencyPerDay: "", durationInDays: "" }]);
 };

 const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
 };

 return (
    <div className="App">
      <Container className="Container">
        <form onSubmit={handleSubmit} className={classes.root}>
          {/* <TextField
            name="description"
            label="Diagnosis Description"
            variant="filled"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          /> */}
          {inputFields.map((inputField, index) => (
            <div key={index}>
              <TextField
                name="name"
                label="Medicine Name"
                variant="filled"
                value={inputField.name}
                onChange={(event) => handleChangeInput(index, event)}
                fullWidth
              />
              <TextField
                name="dosage"
                label="Dosage"
                variant="filled"
                value={inputField.dosage}
                onChange={(event) => handleChangeInput(index, event)}
                fullWidth
              />
              <TextField
                name="frequencyPerDay"
                label="Frequency Per Day"
                variant="filled"
                value={inputField.frequencyPerDay}
                onChange={(event) => handleChangeInput(index, event)}
                fullWidth
              />
              <TextField
                name="durationInDays"
                label="Duration in Days"
                variant="filled"
                value={inputField.durationInDays}
                onChange={(event) => handleChangeInput(index, event)}
                fullWidth
              />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <StyledButton variant="contained" type="submit" color="secondary">
            Submit
          </StyledButton>
        </form>
      </Container>
    </div>
 );
};

export default Medicine;
