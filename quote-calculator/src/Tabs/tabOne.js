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

const TabOne = ({ formData, onFormDataChange, errors }) => {
  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );
  const navigate = useNavigate();

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
        {errors.qn1 && !formData.qn1 && <span style={{ color: 'red' }}>{errors.qn1}</span>}
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
        {errors.qn2 && !formData.qn2 && <span style={{ color: 'red' }}>{errors.qn2}</span>}
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
        {errors.qn3 && !formData.qn3 && <span style={{ color: 'red' }}>{errors.qn3}</span>}
      </Card>

    </Container>
  );
};

export default TabOne;
