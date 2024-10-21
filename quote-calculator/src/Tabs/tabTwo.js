import React, { useState, useEffect } from "react";
import axios from "axios";
import { initMap } from "../Components/BackupMap";
import Map from "./../Components/LeafletMap";
//import OneMap from '../Components/Map';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Autocomplete,
} from "@mui/material";
import { countryList } from "../Components/CountryList";
import { useNavigate } from 'react-router-dom';

// const Map = ({ postalCode })=>{
//     useEffect(()=>{
//         if(postalCode){
//             initMap(postalCode);
//         }
//     }, [postalCode]);
//     return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
// };

const TabTwo = ({ formData, onFormDataChange }) => {
  const apiKey = "a55f4d3770f940e8b31fa151a2dc0246";

  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryList);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [qn4Error, setQn4Error] = useState('');
  const [countryTwoError, setCountryTwoError] = useState('');
  const [stateError, setStateError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [unitError, setUnitError] = useState('');
  const [qn6Error, setQn6Error] = useState('');
  const [qn7Error, setQn7Error] = useState('');
  const [qn8Error, setQn8Error] = useState('');

  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/tab1');  // Navigate to Tab 1 when the button is clicked
  };

  const handleNext = () => {
    if (!formData.qn4) {
      setQn4Error('Please fill in this field.')
    }

    if (!formData.countryTwo) {
      setCountryTwoError('Please fill in this field.')
    }

    if (!formData.state) {
      setStateError('Please fill in this field.')
    }

    if (!formData.city) {
      setCityError('Please fill in this field.')
    }

    if (!formData.postalCode) {
      setPostalCodeError('Please fill in this field.')
    }

    if (!formData.street) {
      setStreetError('Please fill in this field.')
    }

    if (!formData.unit) {
      setUnitError('Please fill in this field.')
    }

    if (!formData.qn6) {
      setQn6Error('Please fill in this field.')
    }

    if (!formData.qn7) {
      setQn7Error('Please fill in this field.')
    }

    if (!formData.qn8) {
      setQn8Error('Please fill in this field.')
    }

    if (formData.qn4 && formData.countryTwo && formData.qn6 && formData.qn7 && formData.qn8
      && !qn4Error && !countryTwoError && !qn6Error && !qn7Error && !qn8Error 
      && formData.state && formData.city && formData.postalCode && formData.street && formData.unit
      && !stateError && !cityError && !postalCodeError && !streetError && !unitError
    ) {
      navigate('/tab3');
    }
  };

  const handleNeedsChange = (e) => {
    const { value } = e.target;
    onFormDataChange("qn4", value);
    if(value){
      setQn4Error(null);
    }
  };

  //address details

  const handleInputChange = (event, value) => {
    setInputValue(value);
    setFilteredCountries(
      countryList.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectCountry = (event, country) => {
    //setInputValue(country);
    setSelectedCountry(country)
    onFormDataChange("countryTwo", country);
    if(country){
      setCountryTwoError(null);
    }
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    onFormDataChange("state", value);
    if(value){
      setStateError(null);
    }
  };
  const handleCityChange = (e) => {
    const { value } = e.target;
    onFormDataChange("city", value);
    if(value){
      setCityError(null);
    }
  };
  const handlePostalCodeChange = (e) => {
    const { value } = e.target;
    onFormDataChange("postalCode", value);
    if(value){
      setPostalCodeError(null);
    }
  };
  const handleStreetChange = (e) => {
    const { value } = e.target;
    onFormDataChange("street", value);
    if(value){
      setStreetError(null);
    }
  };
  const handleUnitChange = (e) => {
    const { value } = e.target;
    onFormDataChange("unit", value);
    if(value){
      setUnitError(null);
    }
  };

  const handleQuestion1Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn6", value);
    if(value){
      setQn6Error(null);
    }
  };
  const handleQuestion2Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn7", value);
    if(value){
      setQn7Error(null);
    }
  };
  const handleQuestion3Change = (e) => {
    const { value } = e.target;
    onFormDataChange("qn8", value);
    if(value){
      setQn8Error(null);
    }
  };

  // const fetchAddress = async (postalCode) => {
  //     try {
  //         const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
  //             params: {
  //                 q: postalCode,
  //                 key: apiKey
  //             }
  //         });
  //         if (response.data.results && response.data.results.length > 0) {
  //             setAddress(response.data.results[0].formatted);
  //         } else {
  //             setAddress('No address found');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching address:', error);
  //         setAddress('Error fetching address');
  //     }
  // };

  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">My site needs</Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn4}
              onChange={handleNeedsChange}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value="Indoors"
                control={<Radio />}
                label="Indoors"
              />
              <FormControlLabel
                value="Outdoors"
                control={<Radio />}
                label="Outdoors"
              />
              <FormControlLabel value="Both" control={<Radio />} label="Both" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn4Error}</span>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                Country
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{countryTwoError}</span>

              <Autocomplete
                fullWidth
                id="country"
                options={filteredCountries}
                value={formData.countryTwo || selectedCountry}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleSelectCountry}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select a country"
                    fullWidth
                  />
                )}
              />
              
            </Grid>

            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                State
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{stateError}</span>
              <TextField
                fullWidth
                variant="outlined"
                id="state"
                value={formData.state}
                onChange={handleStateChange}
                require
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                City
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{cityError}</span>
              
              <TextField
                fullWidth
                variant="outlined"
                id="city"
                value={formData.city}
                onChange={handleCityChange}
                require
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                Postal Code
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{postalCodeError}</span>
              <TextField
                fullWidth
                variant="outlined"
                id="postalCode"
                value={formData.postalCode}
                onChange={handlePostalCodeChange}
                require
                inputProps={{
                  type: "number", // Set the type to number
                }}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                Street Address
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{streetError}</span>
              <TextField
                fullWidth
                variant="outlined"
                id="street"
                value={formData.street}
                onChange={handleStreetChange}
                require
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6} container alignItems="center">
              <Typography variant="h6" align="left">
                Unit Number
              </Typography>
              <span style={{ color: 'red', marginLeft: '20px'}}>{unitError}</span>
              <TextField
                fullWidth
                variant="outlined"
                id="unit"
                value={formData.unit}
                onChange={handleUnitChange}
                require
                margin="normal"
              />
            </Grid>
          </Grid>

          <Spacer size="10px" />
        </CardContent>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">
              Will we have access to any dangerous or mid/pre construction
              sites?
            </Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn6}
              onChange={handleQuestion1Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn6Error}</span>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">
              Do you require our scanners to be accompanied at all times?
            </Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn7}
              onChange={handleQuestion2Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn7Error}</span>
      </Card>

      <Spacer size="30px" />
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">
              Will our team need PPE gear ? (E.G. helmet/construction boots/high
              visibility vest)
            </Typography>
            <RadioGroup
              row // Use `row` for horizontal layout, omit for vertical
              value={formData.qn8}
              onChange={handleQuestion3Change}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <span style={{ color: 'red' }}>{qn8Error}</span>
      </Card>
      <Spacer size="50px" />

      <Grid container spacing={2}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrev}
            sx={{ backgroundColor: '#555555', width: "100px" }}
          >
            <i className="fa fa-angle-double-left"></i> Back
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            sx={{ backgroundColor: '#555555', width: "200px" }}
          >
            Save and Continue <i className="fa fa-angle-double-right"></i>
          </Button>
        </Grid>
      </Grid>
      <Spacer size="50px" />
    </Container>
  );
};

export default TabTwo;
