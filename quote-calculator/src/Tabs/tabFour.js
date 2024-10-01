import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom'; 

const TabFour = ({ formData, onFormDataChange }) => {
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [floorPlan, setFloorPlan] = useState([]);

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/tab3');  // Navigate to Tab 1 when the button is clicked
  };

  const handleNext = () => {
    navigate('/tab5');  // Navigate to Tab 1 when the button is clicked
  };

  const handleCalendarChange = (newDate) => {
    setDate(newDate);
    onFormDataChange("calendar", newDate);
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    return date < today;
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleFloorPlanChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFloorPlan((prevFloorPlans) => [...prevFloorPlans, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveFloorPlan = (index) => {
    setFloorPlan((prevFloorPlan) =>
      prevFloorPlan.filter((_, i) => i !== index)
    );
  };

  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const formattedDate = formData.calendar
    ? formData.calendar.toDateString()
    : "No date selected";

  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Please upload pictures of your site.
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <Box mt={2}>
              <Typography variant="body1">Selected Files:</Typography>
              <ol>
                {images.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <br />
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "5px",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      aria-label="remove"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
              </ol>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              [Optional] Please upload a 2D floor plan.
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-floorplan-file"
              type="file"
              multiple
              onChange={handleFloorPlanChange}
            />
            <label htmlFor="upload-floorplan-file">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <Box mt={2}>
              <Typography variant="body1">Selected Files:</Typography>
              <ol>
                {floorPlan.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <br />
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "5px",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveFloorPlan(index)}
                      aria-label="remove"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
              </ol>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Calendar Booking for Scanning</Typography>
          <Box sx={{ mt: 2 }}>
            <Calendar
              onChange={handleCalendarChange}
              value={formData.calendar}
              tileDisabled={tileDisabled}
            />
          </Box>
          <Typography variant="h6">Selected Date: {formattedDate}</Typography>
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
export default TabFour;
