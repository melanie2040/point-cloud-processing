import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'; 

const TabOne = ({ formData, onFormDataChange }) => {
  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const [qn1Error, setQn1Error] = useState('');
  const [qn2Error, setQn2Error] = useState('');
  const [qn3Error, setQn3Error] = useState('');

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/');  
  };

  const handleNext = () => {

    if(!formData.qn1){
      setQn1Error('Please fill in this field.')
    }

    if(!formData.qn2){
      setQn2Error('Please fill in this field.')
    }

    if(!formData.qn3){
      setQn3Error('Please fill in this field.')
    }

    if(formData.qn1 && formData.qn2 && formData.qn3
      && !qn1Error && !qn2Error && !qn3Error
    ){
      navigate('/tab2'); 
    }


    
  };

  const handleQuestion1Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn1", value);
    if(value){
      setQn1Error(null);
    }

  };
  const handleQuestion2Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn2", value);
    if(value){
      setQn2Error(null);
    }
  };
  const handleQuestion3Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn3", value);
    if(value){
      setQn3Error(null);
    }
  };

  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">I need my 3D scan for</Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn1}
              onChange={handleQuestion1Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value="Robot Mapping"
                control={<Radio />}
                label="Robot Mapping"
              />
              <FormControlLabel
                value="3D Point Cloud"
                control={<Radio />}
                label="3D Point Cloud"
              />
            </RadioGroup>
          </FormControl>

        </CardContent>
        <span style={{ color: 'red' }}>{qn1Error}</span>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">I need to scan:</Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn2}
              onChange={handleQuestion2Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel value="Once" control={<Radio />} label="Once" />
              <FormControlLabel
                value="More than once"
                control={<Radio />}
                label="More than once"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn2Error}</span>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">File format for export:</Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn3}
              onChange={handleQuestion3Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel value="E57" control={<Radio />} label="E57" />
              <FormControlLabel value="PLY" control={<Radio />} label="PLY" />
              <FormControlLabel value="LAS" control={<Radio />} label="LAS" />
              <FormControlLabel value="XYZ" control={<Radio />} label="XYZ" />
              <FormControlLabel value="PCD" control={<Radio />} label="PCD" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn3Error}</span>
      </Card>

      <Spacer size="50px" />

      <Grid container spacing={2}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrev}
            sx={{ backgroundColor: '#555555',width: "100px" }}
          >
            <i className="fa fa-angle-double-left"></i> Back
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            sx={{ backgroundColor: '#555555',width: "200px" }}
          >
            Save and Continue <i className="fa fa-angle-double-right"></i>
          </Button>
        </Grid>
      </Grid>
      <Spacer size="50px" />
    </Container>
  );
};

export default TabOne;
