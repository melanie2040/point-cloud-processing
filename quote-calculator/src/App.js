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
import { FaExclamationCircle } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box, IconButton, Grid, Button,
  Alert, Tabs, Tab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import { AlertProvider } from "./Components/AlertContext";
import { useAlert } from "./Components/AlertContext";
import { Navigate, Outlet } from 'react-router-dom';
import { generate } from "./Components/GeneratePDF";
import { verifyTabZero, verifyTabOne, verifyTabTwo, verifyTabThree, verifyTabFour } from './Validation';

const Spacer = ({ size }) => (
  <div style={{ height: size, width: "100%" }}></div>
);

const ProtectedRoute = ({ isAllowed }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [tabErrors, setTabErrors] = useState({
    tab0: [],
    tab1: [],
    tab2: [],
    tab3: [],
    tab4: [],
  });

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
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);


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
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

  const [tabZeroError, setTabZeroError] = useState(false);
  const [tabOneError, setTabOneError] = useState(false);
  const [tabTwoError, setTabTwoError] = useState(false);
  const [tabThreeError, setTabThreeError] = useState(false);
  const [tabFourError, setTabFourError] = useState(false);

  const handlePrev = () => {
    handleStepClick(currentStep - 1);
  }
  const handleNext = () => {
    if (currentStep === 0) {
      const tabData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        contact: formData.contact,
        industry: formData.industry,
        companyName: formData.companyName,
      };
      let errors = [];
      errors = verifyTabZero(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab0"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabZeroError(false);
      }
      handleStepClick(currentStep + 1);
    }
    else if (currentStep === 1) {
      const tabData = {
        qn1: formData.qn1,
        qn2: formData.qn2,
        qn3: formData.qn3,
      };
      let errors = [];
      errors = verifyTabOne(tabData);
      console.log(errors);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab1"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabOneError(false);
        console.log("Erasseddd");
      }
      handleStepClick(currentStep + 1);
    }
    else if (currentStep === 2) {
      const tabData = {
        qn4: formData.qn4,
        countryTwo: formData.countryTwo,
        state: formData.state,
        city: formData.city,
        postalCode: formData.postalCode,
        street: formData.street,
        unit: formData.unit,
        qn6: formData.qn6,
        qn7: formData.qn7,
        qn8: formData.qn8,
      };
      let errors = [];
      errors = verifyTabTwo(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab2"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabTwoError(false);
      }
      handleStepClick(currentStep + 1);
    } else if (currentStep === 3) {
      const tabData = {
        width: formData.width,
        length: formData.length,
        height: formData.height,
      };
      let errors = [];
      errors = verifyTabThree(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab3"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabThreeError(false);
      }
      handleStepClick(currentStep + 1);
    } else if (currentStep === 4) {
      const tabData = {
        photos: formData.photos,
        calendar: formData.calendar,
      };
      let errors = [];
      errors = verifyTabFour(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab4"]: errors,  // Set the errors for the specific tab
      }));

      //handleStepClick(currentStep + 1);
    }
  }

  const handleJump = (index) => {
    if (currentStep === 0) {
      const tabData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        contact: formData.contact,
        industry: formData.industry,
        companyName: formData.companyName,
      };
      let errors = [];
      errors = verifyTabZero(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab0"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabZeroError(false);
      }
      handleStepClick(index);
    }
    else if (currentStep === 1) {
      const tabData = {
        qn1: formData.qn1,
        qn2: formData.qn2,
        qn3: formData.qn3,
      };
      let errors = [];
      errors = verifyTabOne(tabData);
      console.log(errors);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab1"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabOneError(false);
        console.log("Erasseddd");
      }
      handleStepClick(index);
    }
    else if (currentStep === 2) {
      const tabData = {
        qn4: formData.qn4,
        countryTwo: formData.countryTwo,
        state: formData.state,
        city: formData.city,
        postalCode: formData.postalCode,
        street: formData.street,
        unit: formData.unit,
        qn6: formData.qn6,
        qn7: formData.qn7,
        qn8: formData.qn8,
      };
      let errors = [];
      errors = verifyTabTwo(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab2"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabTwoError(false);
      }
      handleStepClick(index);
    } else if (currentStep === 3) {
      const tabData = {
        width: formData.width,
        length: formData.length,
        height: formData.height,
      };
      let errors = [];
      errors = verifyTabThree(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab3"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabThreeError(false);
      }
      handleStepClick(index);
    } else if (currentStep === 4) {
      const tabData = {
        photos: formData.photos,
        calendar: formData.calendar,
      };
      let errors = [];
      errors = verifyTabFour(tabData);
      setTabErrors(prevErrors => ({
        ...prevErrors,
        ["tab4"]: errors,  // Set the errors for the specific tab
      }));
      if (isEmpty(errors)) {
        setTabFourError(false);
      }
      handleStepClick(index);
    }
  }

  const handleSubmit = async() => {
    let valid = true;

    const tabData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: formData.country,
      contact: formData.contact,
      industry: formData.industry,
      companyName: formData.companyName,
    };
    let errors = [];
    errors = verifyTabZero(tabData);
    setTabErrors(prevErrors => ({
      ...prevErrors,
      ["tab0"]: errors,  // Set the errors for the specific tab
    }));
    if (isEmpty(errors)) {
      setTabZeroError(false);
    } else {
      setTabZeroError(true);
      valid = false;
    }

    const tabData1 = {
      qn1: formData.qn1,
      qn2: formData.qn2,
      qn3: formData.qn3,
    };
    let errors1 = [];
    errors1 = verifyTabOne(tabData1);
    console.log(errors1);
    setTabErrors(prevErrors => ({
      ...prevErrors,
      ["tab1"]: errors1,  // Set the errors for the specific tab
    }));
    if (isEmpty(errors1)) {
      setTabOneError(false);
      console.log("Erasseddd");
    } else {
      setTabOneError(true);
      valid = false;
    }

    const tabData2 = {
      qn4: formData.qn4,
      countryTwo: formData.countryTwo,
      state: formData.state,
      city: formData.city,
      postalCode: formData.postalCode,
      street: formData.street,
      unit: formData.unit,
      qn6: formData.qn6,
      qn7: formData.qn7,
      qn8: formData.qn8,
    };
    let errors2 = [];
    errors2 = verifyTabTwo(tabData2);
    setTabErrors(prevErrors => ({
      ...prevErrors,
      ["tab2"]: errors2,  // Set the errors for the specific tab
    }));
    if (isEmpty(errors2)) {
      setTabTwoError(false);
    } else {
      setTabTwoError(true);
      valid = false;
    }

    const tabData3 = {
      width: formData.width,
      length: formData.length,
      height: formData.height,
    };
    let errors3 = [];
    errors3 = verifyTabThree(tabData3);
    setTabErrors(prevErrors => ({
      ...prevErrors,
      ["tab3"]: errors3,  // Set the errors for the specific tab
    }));
    if (isEmpty(errors3)) {
      setTabThreeError(false);
    } else {
      setTabThreeError(true);
      valid = false;
    }


    const tabData4 = {
      photos: formData.photos,
      calendar: formData.calendar,
    };
    let errors4 = [];
    errors4 = verifyTabFour(tabData4);
    setTabErrors(prevErrors => ({
      ...prevErrors,
      ["tab4"]: errors4,  // Set the errors for the specific tab
    }));
    if (isEmpty(errors4)) {
      setTabFourError(false);
    } else {
      setTabFourError(true);
      valid = false;
    }
    if (valid == true) {
      navigate("/tab5");

      const emailInput = formData.email;
      const doc = generate(formData);
      const pdfBase64 = doc.output("datauristring")

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



    }

  }



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
          {currentStep !== 5 && <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
            <Tabs value={currentStep} textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ overflow: 'hidden' }}>
              {steps.map((step, index) => (
                <Tab
                  key={index}
                  label={(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className={`fa ${step.icon}`} style={{ marginRight: '8px', color: (index > currentStep) ? 'grey' : 'black' }}></i>
                      <span style={{ color: (index > currentStep) ? 'grey' : 'black' }}>{step.title}</span>
                      {tabZeroError == true && index === 0 && (
                        <FaExclamationCircle style={{ color: 'red', marginLeft: '8px' }} />
                      )}
                      {tabOneError == true && index === 1 && (
                        <FaExclamationCircle style={{ color: 'red', marginLeft: '8px' }} />
                      )}
                      {tabTwoError == true && index === 2 && (
                        <FaExclamationCircle style={{ color: 'red', marginLeft: '8px' }} />
                      )}
                      {tabThreeError == true && index === 3 && (
                        <FaExclamationCircle style={{ color: 'red', marginLeft: '8px' }} />
                      )}
                      {tabFourError == true && index === 4 && (
                        <FaExclamationCircle style={{ color: 'red', marginLeft: '8px' }} />
                      )}
                    </div>
                  )}

                  //disabled={index > currentStep && !verifyAllTabsBeforeIndex(index)}
                  onClick={() => handleJump(index)}
                  sx={{
                    opacity: index > currentStep ? 0.5 : 1,
                    //cursor: (index > currentStep && !verifyAllTabsBeforeIndex(index)) ? 'not-allowed' : 'pointer',
                  }}
                />
              ))}
            </Tabs>
          </Box>
          }
        </AppBar>
        <Box sx={{ display: 'flex', flexGrow: 1, height: '100vh', marginTop: '110px' }}>
          <Box sx={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <TabZero
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    errors={tabErrors.tab0}
                  />
                }
              />
              <Route
              //element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(1)} />}
              >
                <Route
                  path="/tab1"
                  element={
                    <TabOne
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                      errors={tabErrors.tab1}
                    />
                  }
                />
              </Route>
              <Route
              //</Routes>element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(2)} />}
              >
                <Route
                  path="/tab2"
                  element={
                    <TabTwo
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                      errors={tabErrors.tab2}
                    />
                  }
                />
              </Route>
              <Route
              //</Routes>element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(3)} />}
              >
                <Route
                  path="/tab3"
                  element={
                    <TabThree
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                      errors={tabErrors.tab3}
                    />
                  }
                />
              </Route>
              <Route
              //</Routes>element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(4)} />}
              >
                <Route
                  path="/tab4"
                  element={
                    <TabFour
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                      errors={tabErrors.tab4}
                    />
                  }
                />
              </Route>
              <Route
              //</Routes>element={<ProtectedRoute isAllowed={verifyAllTabsBeforeIndex(5)} />}
              >
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
            <Spacer size="50px" />
            {currentStep !== 5 &&
              <Grid container spacing={2} sx={{ paddingLeft: '15%', paddingRight: '15%' }}>
                <Grid item xs={6} container justifyContent="flex-start">
                  {currentStep !== 0 && <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePrev}
                    sx={{ backgroundColor: '#555555', width: "100px" }}
                  >
                    <i className="fa fa-angle-double-left"></i> Back
                  </Button>}
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  {currentStep !== 4 &&
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                      sx={{ backgroundColor: '#555555', width: "200px" }}
                    >
                      Save and Continue <i className="fa fa-angle-double-right"></i>
                    </Button>}
                  {currentStep === 4 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      sx={{ width: "200px" }}
                    >
                      Submit <i className="fa fa-angle-double-right"></i>
                    </Button>
                  }
                </Grid>
              </Grid>}
            <Spacer size="50px" />

          </Box>
        </Box>
      </div>
    </AlertProvider>
  );
}

export default App;
