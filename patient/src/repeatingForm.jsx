import React, { useState } from "react";
// import "./styles.css";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

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

const Medicine = () => {
 const classes = useStyles();

 // Adjusted initial state to include Medicine, Dosage, Frequency, and Duration
 const [inputFields, setInputFields] = useState([
    { Medicine: "", Dosage: "", Frequency: "", Duration: "" }
 ]);

 // Updated handleChangeInput to handle the new fields
 const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
 };

 const handleAddFields = () => {
    setInputFields([...inputFields, { Medicine: "", Dosage: "", Frequency: "", Duration: "" }]);
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
          {inputFields.map((inputField, index) => (
            <div key={index}>
              <TextField
                name="Medicine"
                label="Medicine"
                variant="filled"
                value={inputField.Medicine}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="Dosage"
                label="Dosage"
                variant="filled"
                value={inputField.Dosage}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="Frequency"
                label="Frequency"
                variant="filled"
                value={inputField.Frequency}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="Duration"
                label="Duration"
                variant="filled"
                value={inputField.Duration}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          {/* <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >
            Send
          </Button> */}
        </form>
      </Container>
    </div>
 );
};

export default Medicine;
