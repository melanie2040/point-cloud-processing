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

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/');  // Navigate to Tab 1 when the button is clicked
  };

  const handleNext = () => {
    navigate('/tab2');  // Navigate to Tab 1 when the button is clicked
  };

  const handleQuestion1Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn1", value);
  };
  const handleQuestion2Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn2", value);
  };
  const handleQuestion3Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn3", value);
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
      </Card>

      <Spacer size="50px" />

      <Grid container spacing={2}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrev}
            sx={{ width: "100px" }}
          >
            <i className="fa fa-angle-double-left"></i> Back
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            sx={{ width: "200px" }}
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
