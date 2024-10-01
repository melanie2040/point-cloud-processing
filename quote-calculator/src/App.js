import logo from "./logo.svg";
import "./App.css";
import dcon from "./dC.svg";
import React, { useState, useRef } from "react";
import TabZero from "./Tabs/tabZero";
import TabOne from "./Tabs/tabOne";
import TabTwo from "./Tabs/tabTwo";
import TabThree from "./Tabs/tabThree";
import TabFour from "./Tabs/tabFour";
import TabFive from "./Tabs/tabFive";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const totalTabs = 6;
  const [validationErrors, setValidationErrors] = useState({});

  const [error, setError] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const location = useLocation(); // Get the current location
  useEffect(() => {
    // Update currentTab based on the current URL
    switch (location.pathname) {
      case "/":
        setCurrentStep(0);
        break;
      case "/tab1":
        setCurrentStep(1);
        break;
      case "/tab2":
        setCurrentStep(2);
        break;
      case "/tab3":
        setCurrentStep(3);
        break;
      case "/tab4":
        setCurrentStep(4);
        break;
      case "/tab5":
        setCurrentStep(5);
        break;
      default:
        setCurrentStep(0); // Default case
    }
  }, [location.pathname]);

  const steps = [
    { icon: "fa-info-circle", title: "Basics" },
    { icon: "fa-cogs", title: "Specifications" },
    { icon: "fa-map-marker", title: "Site" },
    { icon: "fa-wallet", title: "Quotation" },
    { icon: "fa-image", title: "Imagery" },
    //{ icon: "fa-scroll", title: "Review" },
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/tab1");
        break;
      case 2:
        navigate("/tab2");
        break;
      case 3:
        navigate("/tab3");
        break;
      case 4:
        navigate("/tab4");
        break;
      case 5:
        navigate("/tab5");
        break;
      default:
        navigate("/");
    }
  };

  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    contact: "",
    email: "",
    country: "",
    industry: "",
    companyName: "",
    qn1: "",
    qn2: "",
    qn3: "",
    qn4: "",
    countryTwo: "",
    state: "",
    city: "",
    postalCode: "",
    street: "",
    unit: "",
    qn6: "",
    qn7: "",
    qn8: "",
    width: "",
    length: "",
    height: "",
    volume: "",
    quote: "",
    photos: "",
    floorPlan: "",
    calendar: "",
    // Add other fields as needed
  });

  const calculateQuote = () => {
    const volume = formData.volume;

    if (volume >= 1 && volume <= 20000) {
      formData.quote = 0.005 * volume;
    } else if (volume > 20000 && volume <= 250000) {
      formData.quote = 0.004 * volume;
    } else if (volume > 250000 && volume <= 1000000) {
      formData.quote = 0.003 * volume;
    } else if (volume > 1000000 && volume <= 10000000) {
      formData.quote = 0.002 * volume;
    } else if (volume > 10000000) {
      formData.quote = "Please contact us for a quote";
    } else {
      //setValidationError("Total volume has to be >= 1 cubic metres");
      //onFormDataChange('volume', null);
      //onFormDataChange('quote', null);
    }
  };

  const calculateVolume = () => {
    const width = formData.width;
    const length = formData.length;
    const height = formData.height;
    if (width && length && height) {
      const volume = width * length * height;
      formData.volume = volume;
      calculateQuote();
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    //setCurrentTab(5);

    // const doc = new jsPDF();

    // doc.setFontSize(16);
    // doc.text('Full name: ' + formData.firstName + ' ' + formData.lastName, 10, 10);
    // doc.text('Contact: ' + formData.contact, 10, 20);
    // doc.text('Email: ' + formData.email, 10, 30);
    // doc.text('Country: ' + formData.country, 10, 40);
    // doc.text('Industry: ' + formData.industry, 10, 50);
    // doc.text('Company: ' + formData.companyName, 10, 60);

    // const pdfBlob = doc.output('blob');
    // const pdfBase64 = await blobToBase64(pdfBlob);

    const element = document.getElementById("content");
    const options = {
      margin: [1, 0, 1, 0], // 1 inch margin
      html2canvas: { scale: 2 }, // Higher scale for better quality
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    // Generate PDF as a Blob
    const pdfBlob = await html2pdf().from(element).set(options).output("blob");

    // Convert Blob to Base64
    const pdfBase64 = await blobToBase64(pdfBlob);

    const emailInput = "gdgd60358@gmail.com";

    //doc.save(`${formData.companyName}-quote-calculator.pdf`);

    await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput, // Ensure emailInput is defined in your scope
        pdf: pdfBase64,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Handle success
        alert("Email sent successfully!"); // Notify user
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to send email."); // Notify user
      });
  };

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Get base64 string
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleViewSummary = () => {
   // setCurrentTab(6);
  };

  const handleDownload = () => {
    const element = document.getElementById("content");

    const options = {
      margin: [1, 0, 1, 0], // 1 inch margin
      filename: "custom.pdf",
      html2canvas: { scale: 2 }, // Higher scale for better quality
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save(`${formData.companyName}-QuoteEstimation.pdf`)
      .catch((err) => console.error(err));
  };

  return (
    <div className="App" id="content">

        <AppBar position="static" sx={{ backgroundColor: "grey.500" }}>
          <Toolbar>
            <img src={dcon} width="30" height="30" alt="Logo" />
            <Typography
              variant="h6"
              style={{ marginLeft: "16px", fontWeight: "bold" }}
            >
              Point Cloud and Image Processing Quote Calculator
            </Typography>
          </Toolbar>
          <div
            className="steps-container d-flex justify-content-center"
            style={{ marginBottom: "16px" }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className={`d-flex align-items-center step ${
                  index === currentStep ? "active" : ""
                }`}
                onClick={() => handleStepClick(index)}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                <span className="step-icon">
                  <i className={`fa ${step.icon}`}></i>
                </span>
                {index === currentStep && (
                  <span style={{ marginLeft: "10px" }}>{step.title}</span>
                )}
              </div>
            ))}
          </div>
        </AppBar>

        <Routes>
          <Route
            path="/"
            element={
              <TabZero
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
          <Route
            path="/tab1"
            element={
              <TabOne
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
          <Route
            path="/tab2"
            element={
              <TabTwo
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
          <Route
            path="/tab3"
            element={
              <TabThree
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
          <Route
            path="/tab4"
            element={
              <TabFour
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
          <Route
            path="/tab5"
            element={
              <TabFive
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />
            }
          />
        </Routes>

    </div>
  );
}

export default App;
