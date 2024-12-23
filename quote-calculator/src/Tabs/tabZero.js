import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Autocomplete,
} from "@mui/material";
import countryCodeLookup from "country-code-lookup";
import { getCountryCallingCode } from "libphonenumber-js";
import { countryList } from "../Components/CountryList";
import { useNavigate } from "react-router-dom";

const TabZero = ({ formData, onFormDataChange, errors }) => {
  const navigate = useNavigate();
  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const industries = [
    "Aerospace & Defence",
    "Architecture, Engineering & Construction Automotive",
    "Electronics",
    "Energy, Water & Infrastructure",
    "FMCG & Pharma",
    "Food & Beverage",
    "Healthcare",
    "Insurance & Banking",
    "IT Vendor or Service Providers",
    "Machinery & Equipment",
    "Maintenance & Facility Management",
    "Oil, Gas & Chemicals",
    "Public Sector",
    "Real Estate",
    "Retail",
    "Surveying & Reality Capturing",
    "Tranportation & Logistics",
    "Other",
  ];

  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryList);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
    setFilteredCountries(
      countryList.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    onFormDataChange("firstName", value);

  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    onFormDataChange("lastName", value);

  };

  const handleContactChange = (e) => {
    const { value } = e.target;
    onFormDataChange("contact", value);

  };

  let timeoutId = null;

  const isValidEmail = (email)=>{
    const emailPattern = /^.+@.+\.[a-zA-Z]{2,63}$/;
    if (!emailPattern.test(email) || email.includes('@gmail.com') || email.includes('@yahoo.com') || email.includes('@outlook.com') || email.includes('@hotmail.com')) {
        return false
    }else{
      return true;
    }
  }

  const handleEmailChange = (e) => {
    const { value } = e.target;
    onFormDataChange("email", value);

    // Clear previous timeout if it exists
    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }

    // // Set a new timeout
    // timeoutId = setTimeout(() => {
    //   const emailPattern = /^.+@.+\.[a-zA-Z]{2,63}$/;
    //   if (!emailPattern.test(value) || !value || value.includes('@gmail.com') || value.includes('@yahoo.com') || value.includes('@outlook.com') || value.includes('@hotmail.com')) {
    //     setEmailError("Invalid corporate email format");
    //   } else {
    //     setEmailError(null);
    //   }
    // }, 1500); // Adjust the delay (300ms) as needed
  };

  const getCountryCode = (countryName) => {
    const result = countryCodeLookup.byCountry(countryName);
    console.log(result);
    if (result) {
      const code = getCountryCallingCode(result.iso2.toUpperCase());
      return code;
      // This will give you the calling code
    } else {
      return null; // Handle the case where the country is not found
    }
  };

  const handleSelectCountry = (event, country) => {
    //setInputValue(country);
    setSelectedCountry(country);
    onFormDataChange("country", country);

    const cc = getCountryCode(country);
    setCountryCode(cc);
    onFormDataChange("countryCode", cc);
  };

  const handleSelectIndustry = (industry) => {
    onFormDataChange("industry", industry);
    handleMenuClose();

  };

  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    onFormDataChange("companyName", value);

  };

  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            First Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="firstName"
            value={formData.firstName}
            onChange={handleFirstNameChange}
            require
            margin="normal"
          />
          {errors.firstName && !formData.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </Box>
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            Last Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="lastName"
            value={formData.lastName}
            onChange={handleLastNameChange}
            require
            margin="normal"
          />
          {errors.lastName && !formData.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </Box>
      </Box>

      <Spacer size="30px" />

      <Grid item xs={12}>
        <Typography variant="h6" align="left">
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          id="email"
          value={formData.email}
          onChange={handleEmailChange}
          error={!!error}
          helperText={error}
          require
          margin="normal"
        />
        {errors.email && (!formData.email || isValidEmail(formData.email) == false) && <span style={{ color: 'red' }}>{errors.email}</span>}
      </Grid>

      <Spacer size="30px" />

      <Grid item xs={12}>
        <Typography variant="h6" align="left">
          Country
        </Typography>

        <Autocomplete
          fullWidth
          id="country"
          options={filteredCountries}
          value={formData.country || selectedCountry}
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
        {errors.country && !formData.country && <span style={{ color: 'red' }}>{errors.country}</span>}
      </Grid>

      <Spacer size="30px" />
      <Typography variant="h6" align="left">
        Contact Number
      </Typography>
      <Grid container>
        <Grid item xs={2} container alignItems="center">
          <Typography variant="h8" align="left">
            +{formData.countryCode}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          {/* <Typography variant="h6" align="left">Contact Number</Typography> */}
          <TextField
            fullWidth
            variant="outlined"
            id="contact"
            value={formData.contact}
            onChange={handleContactChange}
            require
            inputProps={{
              type: "number", // Set the type to number
            }}
            margin="normal"
          />
          {errors.contact && !formData.contact && <span style={{ color: 'red' }}>{errors.contact}</span>}
        </Grid>
      </Grid>

      <Spacer size="30px" />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left" mb={2}>
            Industry
          </Typography>
          <Box display="flex" justifyContent="flex-start">
            <Button
              variant="outlined"
              onClick={handleMenuOpen}
              sx={{ width: "250px" }}
            >
              {formData.industry || "Select an industry"}
            </Button>
            <Menu
              anchorE1={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {industries.map((industry, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSelectIndustry(industry)}
                >
                  <Typography>{industry}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
          {errors.industry && !formData.industry && <span style={{ color: 'red' }}>{errors.industry}</span>}
        </Box>

        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            Company Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="companyName"
            value={formData.companyName}
            onChange={handleCompanyNameChange}
            require
            margin="normal"
          />
          {errors.companyName && !formData.companyName && <span style={{ color: 'red' }}>{errors.companyName}</span>}
        </Box>
      </Box>

    </Container>
  );
};

export default TabZero;
