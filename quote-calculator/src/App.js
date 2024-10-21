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
  Box, IconButton,
  Alert, Tabs, Tab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import { AlertProvider } from "./Components/AlertContext";
import { useAlert } from "./Components/AlertContext";
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ isAllowed }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showAlert = useAlert();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  }

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


  ];

  const verifyAllTabsBeforeIndex = (index) => {
    for (let i = 0; i < index; i++) {
      const isValid = verifyTab(i);
      if (!isValid) {
        return false;
      }
    }
    return true;
  };

  const handleStepClick = (index) => {
    if (index > currentStep) {
      const response = verifyAllTabsBeforeIndex(index);
      if (response == true) {
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
          default:
            navigate("/");
        }

      }
    } else {
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
        default:
          navigate("/");
      }

    }

  };

  const [open, setOpen] = React.useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const verifyTab = (index) => {
    switch (index) {
      case 0:
        if (!formData.firstName || !formData.lastName || !formData.country
          || !formData.email || !formData.contact || !formData.industry || !formData.companyName) {
          //handleClick();
          //showAlert("Please fill in all fields");
          return false;
        } else {
          return true;
        }
      case 1:
        if (!formData.qn1 || !formData.qn2 || !formData.qn3) {
          return false;
        } else {
          return true;
        }
      case 2:
        if (!formData.qn4 || !formData.countryTwo || !formData.state || !formData.postalCode
          || !formData.city || !formData.street || !formData.unit || !formData.qn6 || !formData.qn7 || !formData.qn8) {
          return false;
        } else {
          return true;
        }
      case 3:
        if (!formData.width || !formData.length || !formData.height || !formData.volume || !formData.quote) {
          return false;
        } else {
          return true;
        }
      case 4:
        if (!formData.photos || !formData.calendar) {
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }

  }



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
    <AlertProvider>
      <div className="App" id="content">

        <AppBar position="fixed" sx={{ backgroundColor: "grey.500" }}>
          <Toolbar>
            <img src={dcon} width="30" height="30" alt="Logo" />
            <Typography
              variant="h6"
              style={{ marginLeft: "16px", fontWeight: "bold" }}
            >
              Point Cloud and Image Processing Quote Calculator
            </Typography>
          </Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
            <Tabs value={currentStep} textColor="inherit">
              {steps.map((step, index) => (
                <Tab
                  key={index}
                  label={(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className={`fa ${step.icon}`} style={{ marginRight: '8px', color: (index > currentStep && !verifyAllTabsBeforeIndex(index)) ? 'grey' : 'black' }}></i>
                      <span style={{ color: (index > currentStep && !verifyAllTabsBeforeIndex(index)) ? 'grey' : 'black' }}>{step.title}</span>
                    </div>
                  )}
                  disabled={index > currentStep && !verifyAllTabsBeforeIndex(index)}
                  onClick={() => handleStepClick(index)}
                  sx={{
                    opacity: index > currentStep ? 0.5 : 1,
                    cursor: (index > currentStep && !verifyAllTabsBeforeIndex(index)) ? 'not-allowed' : 'pointer',
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </AppBar>
        <Box sx={{ display: 'flex', flexGrow: 1, height: '100vh', marginTop: '90px' }}>
          <Box sx={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
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
              <Route element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(1)} />}>
                <Route
                  path="/tab1"
                  element={
                    <TabOne
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(2)} />}>
                <Route
                  path="/tab2"
                  element={
                    <TabTwo
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(3)} />}>
                <Route
                  path="/tab3"
                  element={
                    <TabThree
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(4)} />}>
                <Route
                  path="/tab4"
                  element={
                    <TabFour
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(5)} />}>
                <Route
                  path="/tab5"
                  element={
                    <TabFive
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                    />
                  }
                />
              </Route>
            </Routes>

          </Box>
        </Box>
      </div>
    </AlertProvider>
  );
}

export default App;
