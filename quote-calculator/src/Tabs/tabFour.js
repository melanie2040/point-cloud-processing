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
  const [images, setImages] = useState(formData.photos);
  const [floorPlan, setFloorPlan] = useState(formData.floorPlan);

  const [imagesError, setImagesError] = useState(null);
  const [dateError, setDateError] = useState(null);

  const navigate = useNavigate();


  const handleCalendarChange = (newDate) => {
    setDate(newDate);
    onFormDataChange("calendar", newDate);

    if(newDate){
      setDateError(null);
    }
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    return date < today;
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const update = [...(formData.photos || []), ...newFiles];
    //const updatedImages = [...(formData.images || []), ...newFiles];
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newFiles];
  
      // Now update formData with the new images array
      onFormDataChange("photos", update);
      setImagesError(null);
  
      return updatedImages; // Return the updated images array for local state
    });
  };

  const handleFloorPlanChange = (event) => {
    const newFiles = Array.from(event.target.files);

    setFloorPlan((prevFloorPlans) => {
      const updatedFloorPlans = [...prevFloorPlans, ...newFiles];

  
      // Now update formData with the new images array
      onFormDataChange("floorPlan", updatedFloorPlans);
  
      return updatedFloorPlans; // Return the updated images array for local state
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
  
      // Update formData with the new images array
      onFormDataChange("photos", updatedImages);
  
      return updatedImages; // Return the updated images array for local state
    });
  };

  const handleRemoveFloorPlan = (index) => {
    setFloorPlan((prevFloorPlan) => {
      const updatedFloorPlans = prevFloorPlan.filter((_, i) => i !== index);
  
      // Update formData with the new images array
      onFormDataChange("floorPlan", updatedFloorPlans);
  
      return updatedFloorPlans; // Return the updated images array for local state
    });
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
              Please upload photos of your site.
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
    
                {images.length>0 && images.map((file, index) => (
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
        <span style={{ color: 'red' }}>{imagesError}</span>
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
                {floorPlan.length > 0 && floorPlan.map((file, index) => (
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
        <span style={{ color: 'red' }}>{dateError}</span>
      </Card>

    </Container>
  );
};
export default TabFour;
