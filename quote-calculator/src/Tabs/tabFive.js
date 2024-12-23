import React, { useState, forwardRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const TabFive = ({ formData, onFormDataChange }) => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate("/"); // Navigate to Tab 1 when the button is clicked
  };

  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const formattedDate = formData.calendar
    ? formData.calendar.toDateString()
    : "No date selected";

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Quotation Calculation Summary", 20, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 1: Basics", 20, 30);

    // List styling with bullet points
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, 40);
    doc.text(`Contact: +${formData.countryCode} ${formData.contact}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Country: ${formData.country}`, 20, 70);
    doc.text(`Company: ${formData.industry}, ${formData.companyName}`, 20, 80);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 2: Specifications", 20, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`I need my 3D scan for ${formData.qn1}`, 20, 100);
    doc.text(`I need to scan ${formData.qn2}`, 20, 110);
    doc.text(`File format for export: ${formData.qn3}`, 20, 120);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 3: Site", 20, 130);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`My site needs ${formData.qn4}`, 20, 140);
    doc.text(`Site address: ${formData.countryTwo}, ${formData.state}, ${formData.city}, ${formData.street}, ${formData.unit}, ${formData.postalCode}`, 20, 150);
    doc.text(`Will we have any access ${formData.qn6}`, 20, 160);
    doc.text(`Do you require our scanners ${formData.qn7}`, 20, 170);
    doc.text(`Will our team need PPE gear ${formData.qn8}`, 20, 180);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 3: Quotation", 20, 190);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Dimensions: ${formData.width}, ${formData.length}, ${formData.height}`, 20, 200);
    doc.text(`Volume: ${formData.volume} cubic metres`, 20, 210);
    doc.text(`Quotation: USD ${formData.quote}`, 20, 220);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 4: Imagery", 20, 230);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const date = new Date(formData.calendar);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',  // "Sat"
      year: 'numeric',   // "2025"
      month: 'short',    // "Jan"
      day: 'numeric'     // "4"
    });
    doc.text(`Scanning Date: ${formattedDate}`, 20, 240)

    // Function to add a single image to the PDF (added inside the callback)
    function addImageToPDF(image) {
      const imageURL = URL.createObjectURL(image);
      return imageURL;
    }

    // Assuming you have an array of images, like form.photos
    doc.addPage();
    let yPosition = 30; // Starting Y position for images
    doc.text(`Site Images: `, 20, 20)
    console.log('one file', formData.photos[1]);
    for (const photo of formData.photos) {
      const url = addImageToPDF(photo);
      doc.addImage(url, 'JPEG', 20, yPosition, 50, 30);
      yPosition += 40;
    }

    doc.text(`Floor Plan: `, 20, yPosition);
    yPosition += 10;
    for (const photo of formData.floorPlan) {
      const url = addImageToPDF(photo);
      doc.addImage(url, 'JPEG', 20, yPosition, 50, 30);
      yPosition += 40;
    }



    // Adjust the size and position as needed
    ;

    // Add images one by one (without a for-loop, using callback)
    // formData.photos.forEach(function (photo, index) {
    //   // Call the addImageToPDF function for each image
    //   addImageToPDF(photo, yPosition + (index * 60)); // Adjust Y position for each image
    //   console.log(photo, "photototototo");
    // })// Add images from the 'photos' array
    //if (formData.floorPlan.length > 0) { addImagesFromArray(formData.floorPlan) };

    // Save the PDF
    doc.save("download.pdf");
  };


  return (
    <Container sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
        Thank you for your submission. A salesperson will be in contact with you
        shortly. A copy of your quote estimation has been emailed to your
        provided email address.
      </Card>
      <Button onClick={handleDownload}>Download PDF</Button>
      <Spacer size="50px" />
      <div id="content">
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" align="left">
                  Full name
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.firstName} {formData.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" align="left">
                  Contact
                </Typography>
                <Typography variant="body1" align="left">
                  +{formData.countryCode} {formData.contact}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Email
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Country
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.country}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Industry
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.industry}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Company
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.companyName}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  You need your 3D scanning for:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn1}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  You want to scan:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn2}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  File Export Format:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn3}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Your site needs:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn4}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Address:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.street}, {formData.unit}, {formData.city},{" "}
                  {formData.state}, {formData.countryTwo}, {formData.postalCode}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Will we have access to any dangerous or mid/pre construction
                  sites?{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn6}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Do you require our scanners to be accompanied at all times?{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn7}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="left">
                  Will our team need PPE gear?{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.qn8}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4}>
                <Typography variant="h6" align="left">
                  Width:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.width} m
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography variant="h6" align="left">
                  Length:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.length} m
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography variant="h6" align="left">
                  Height:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.height} m
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" align="left">
                  Volume:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.volume} m<sup>3</sup>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="h6" align="left">
                  Estimated Quote:{" "}
                </Typography>
                <Typography variant="body1" align="left">
                  {formData.quote} USD
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" align="left">
              Scanning Date: {formattedDate}
            </Typography>
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            {formData.photos.length > 0 ? (
              formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)} // Create a temporary URL for the image
                  alt={`Uploaded ${index + 1}`} // Alt text for accessibility
                  style={{ width: '200px', height: 'auto', marginBottom: '10px', marginRight: '10%' }} // Style as needed
                />
              ))
            ) : (
              <p>No images uploaded.</p> // Fallback message when there are no images
            )}
          </CardContent>
        </Card>

        <Spacer size="30px" />
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            {formData.floorPlan.length > 0 ? (
              formData.floorPlan.map((plan, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(plan)} // Create a temporary URL for the image
                  alt={`Uploaded ${index + 1}`} // Alt text for accessibility
                  style={{ width: '200px', height: 'auto', marginBottom: '10px', marginRight: '10%' }} // Style as needed
                />
              ))
            ) : (
              <p>No floor plan uploaded.</p> // Fallback message when there are no images
            )}
          </CardContent>
        </Card>
      </div>

      <Spacer size="50px" />

      <Grid container spacing={2}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrev}
            sx={{ backgroundColor: '#555555', width: "200px" }}
          >
            <i className="fa fa-angle-double-left"></i> Back to Form
          </Button>
        </Grid>
      </Grid>
      <Spacer size="50px" />
    </Container>
  );
};
export default TabFive;





// function blobToBase64(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]); // Get base64 string
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// }

// const handleViewSummary = () => {
//   // setCurrentTab(6);
// };


