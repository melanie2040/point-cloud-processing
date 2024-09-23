import logo from "./logo.svg";
import "./App.css";
import dcon from "./dC.svg";
import React, { useState } from "react";
import TabZero from './Tabs/tabZero';
import TabOne from './Tabs/tabOne';
import TabTwo from './Tabs/tabTwo';
import TabThree from './Tabs/tabThree';
import TabFour from './Tabs/tabFour';
import TabFive from './Tabs/tabFive';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import { AppBar, Toolbar, Typography, Button, Card, CardHeader, CardContent, Container, Grid, Box } from '@mui/material';

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const totalTabs = 6;
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const handleNextPrev = (direction) => {
    if (direction === -1) {
      const newTab = currentTab + direction;
      if (newTab >= 0 && newTab < totalTabs) {
        setCurrentTab(newTab);
      }
    } else if (direction === 1) {
      if (validateTab(currentTab)) {
        setCurrentTab(prevTab => prevTab + 1);
        setValidationErrors(prevErrors => ({ ...prevErrors, [currentTab]: '' }));
      } else {
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          [currentTab]: 'Please fill in all required fields'
        }));
      }
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <TabZero formData={formData} onFormDataChange={handleFormDataChange} />;
      case 1:
        return <TabOne formData={formData} onFormDataChange={handleFormDataChange} />;
      case 2:
        return <TabTwo formData={formData} onFormDataChange={handleFormDataChange} />;
      case 3:
        return <TabThree formData={formData} onFormDataChange={handleFormDataChange} />;
      case 4:
        return <TabFour formData={formData} onFormDataChange={handleFormDataChange} />;
      case 5:
        return <TabFive formData={formData} />;

      default:
        return null;
    }
  };

  const steps = [
    { icon: "fa-info-circle", title: "Basics" },
    { icon: "fa-cogs", title: "Specifications" },
    { icon: "fa-map-marker", title: "Site" },
    { icon: "fa-wallet", title: "Quotation" },
    { icon: "fa-image", title: "Imagery" },
    //{ icon: "fa-scroll", title: "Review" },
  ];

  const handleStepClick = (index) => {
    if (index > currentTab) {
      {
        validateTab(currentTab) ? setCurrentTab(index) :
          setValidationErrors(prevErrors => ({
            ...prevErrors,
            [currentTab]: 'Please fill in all required fields'
          }));
      };
    } else {
      setCurrentTab(index);
    }
  }


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '',
    contact: '',
    email: '',
    country: '',
    industry: '',
    companyName: '',
    qn1: '',
    qn2: '',
    qn3: '',
    qn4: '',
    countryTwo: '',
    state: '',
    city: '',
    postalCode: '',
    street: '',
    unit: '',
    qn6: '',
    qn7: '',
    qn8: '',
    width: '',
    length: '',
    height: '',
    volume: '',
    quote: '',
    photos: '',
    floorPlan: '',
    calendar: '',
    // Add other fields as needed
  });

  const calculateQuote = () => {
    const volume = formData.volume

    if (volume >= 1 && volume <= 20000) {
      formData.quote = (0.005 * volume);
    } else if (volume > 20000 && volume <= 250000) {
      formData.quote = (0.004 * volume);
    } else if (volume > 250000 && volume <= 1000000) {
      formData.quote = (0.003 * volume);
    } else if (volume > 1000000 && volume <= 10000000) {
      formData.quote = (0.002 * volume);
    } else if (volume > 10000000) {
      formData.quote = ("Please contact us for a quote");
    } else {
      //setValidationError("Total volume has to be >= 1 cubic metres");
      //onFormDataChange('volume', null);
      //onFormDataChange('quote', null);
    }
  }


  const calculateVolume = () => {
    const width = formData.width;
    const length = formData.length;
    const height = formData.height;
    if (width && length && height) {
      const volume = width * length * height;
      formData.volume = volume;
      calculateQuote();
    }
  }


  const validateTab = (tab) => {
    switch (tab) {
      case 0:
        return formData.contact && formData.email && formData.firstName && formData.lastName && formData.country && formData.industry && formData.companyName;
      case 1:
        return formData.qn1 && formData.qn2 && formData.qn3;
      case 2:
        return formData.qn4 && formData.qn6 && formData.qn7 && formData.qn8;
      case 3:
        if (formData.length && formData.width && formData.height && (formData.length * formData.width * formData.height>=1)) {
          calculateVolume();
        } else {
          return false;
        };
      case 4:
        return "slay";

      default:
        return false;
    }
  }

  const handleFormDataChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = async () => {

    setCurrentTab(5);

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Full name: ' + formData.firstName + ' ' + formData.lastName, 10, 10);
    doc.text('Contact: ' + formData.contact, 10, 20);
    doc.text('Email: ' + formData.email, 10, 30);
    doc.text('Country: ' + formData.country, 10, 40);
    doc.text('Industry: ' + formData.industry, 10, 50);
    doc.text('Company: ' + formData.companyName, 10, 60);

    const pdfBlob = doc.output('blob');
    const pdfBase64 = await blobToBase64(pdfBlob);

    const emailInput = 'gdgd60358@gmail.com';

    //doc.save(`${formData.companyName}-quote-calculator.pdf`);

    await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput, // Ensure emailInput is defined in your scope
        pdf: pdfBase64,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Handle success
        alert('Email sent successfully!'); // Notify user
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to send email.'); // Notify user
      });

    // setSubmitted(true);


  };

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 string
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleDownload = () => {
    const element = document.getElementById('content');

    const options = {
      margin: [1, 0, 1, 0], // 1 inch margin
      filename: 'custom.pdf',
      html2canvas: { scale: 2 }, // Higher scale for better quality
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save(`${formData.companyName}-QuoteEstimation.pdf`)
      .catch(err => console.error(err));
  }


  return (
    <div className="App" id="content">
      <AppBar position="static" sx={{ backgroundColor: 'grey.500' }}>
        <Toolbar>
          <img
            src={dcon}
            width="30"
            height="30"
            alt="Logo"
          />
          <Typography variant="h6" style={{ marginLeft: '16px' }}>
            Point Cloud and Image Processing Quote Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, width: '90%' }}>
        <Card >
          {currentTab < totalTabs - 1 && (
            <CardHeader
              title="This application helps you calculate quotes for point cloud and image processing tasks."
              titleTypographyProps={{ fontWeight: 'bold' }}
            />
          )}
          <CardContent>
            {currentTab < totalTabs - 1 && (
              <div className="steps-container d-flex justify-content-center">

                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center step ${index === currentTab ? 'active' : ''}`}
                    onClick={() => handleStepClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="step-icon">
                      <i className={`fa ${step.icon}`}></i>
                    </span>
                    {index === currentTab && (
                      <span style={{ marginLeft: '10px' }}>{step.title}</span>
                    )}
                  </div>
                ))}

              </div>

            )}

            <div className="container mt-4">
              {currentTab == totalTabs - 1 && (<Button
                onClick={handleDownload}>
                Download PDF
              </Button>
              )}
              {renderTabContent()}
              {validationErrors[currentTab] && <div className="error-message">{validationErrors[currentTab]}</div>}
              <Grid container spacing={2}>
                <Grid item xs={6} container justifyContent="flex-start">
                  {currentTab > 0 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleNextPrev(-1)}
                      sx={{ width: '100px' }}
                      disabled={currentTab === 0}
                    >
                      <i className="fa fa-angle-double-left"></i> Back
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  {currentTab < totalTabs - 2 && (<Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleNextPrev(1)}
                    sx={{ width: '200px' }}
                    disabled={currentTab === totalTabs - 1}
                  >
                    Save and Continue <i className="fa fa-angle-double-right"></i>
                  </Button>
                  )}
                  {currentTab == totalTabs - 2 && (<Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    sx={{ width: '200px' }}
                  >
                    Submit Form <i className="fa fa-angle-double-right"></i>
                    {/* {submitted && <Typography color="white">PDF has been generated!</Typography>} */}
                  </Button>
                  )}
                </Grid>
              </Grid>
            </div>

          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;

