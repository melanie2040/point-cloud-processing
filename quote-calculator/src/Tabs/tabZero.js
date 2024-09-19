import React, { useState } from "react";
import { Container, Grid, TextField, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import countryCodeLookup from 'country-code-lookup';
import { getCountryCallingCode } from 'libphonenumber-js';

const TabZero = ({ formData, onFormDataChange }) => {

  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan","Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

  const industries = ["Aerospace & Defence", "Architecture, Engineering & Construction Automotive", "Electronics", "Energy, Water & Infrastructure", "FMCG & Pharma", "Food & Beverage", "Healthcare", "Insurance & Banking", "IT Vendor or Service Providers", "Machinery & Equipment", "Maintenance & Facility Management", "Oil, Gas & Chemicals", "Public Sector", "Real Estate", "Retail", "Surveying & Reality Capturing", "Tranportation & Logistics", "Other"];

  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [visibility, setVisibility] = useState(false);

  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleVisibility = () => {
    setVisibility(true);
  }

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

  const handleEmailChange = (e) => {
    const { value } = e.target;
    onFormDataChange("email", value);
    if (!/@.*\.com$/.test(value)) { // Simple regex for email validation
      setError('Invalid corporate email format');
    } else {
      setError(''); // Clear error if valid
    }
  };

  const getCountryCode = (countryName) => {
    const result = countryCodeLookup.byCountry(countryName);
    console.log(result);
    const code = getCountryCallingCode(result.iso2.toUpperCase());
    if (result) {
      return code; // This will give you the calling code
    } else {
      return 'null'; // Handle the case where the country is not found
    }
  };

  const handleSelectCountry = (country) => {
    setInputValue(country);
    setVisibility(false);
    onFormDataChange("country", country);

    const cc = getCountryCode(country);
    setCountryCode(cc);
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

    <Container sx={{ mt: 5, width: '100%' }}>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">First Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="firstName"
            value={formData.firstName}
            onChange={handleFirstNameChange}
            require
            margin="normal"
          />
        </Box>
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">Last Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="lastName"
            value={formData.lastName}
            onChange={handleLastNameChange}
            require
            margin="normal"
          />
        </Box>
      </Box>

      <Spacer size="30px" />

      <Grid item xs={12}>
        <Typography variant="h6" align="left">Email</Typography>
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
        

      </Grid>

      <Spacer size="30px" />

      <Grid item xs={12}>
        <Typography variant="h6" align="left">Country</Typography>
        <div class="input-group mb-3">
          <TextField
            fullWidth
            variant="outlined"
            id="country"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleVisibility}
            placeholder={!formData.country ? "Choose a country" : "Choose another country"}
          />
        </div>
        {visibility && (
          <div className="dropdown">
            <ul className="list-group">
              {filteredCountries.map((country, index) => (
                <li key={index} className="list-group-item">
                  <a onClick={() => handleSelectCountry(country)}>
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Grid>


      <Spacer size="30px" />
      <Typography variant="h6" align="left">Contact Number</Typography>
      <Grid container>
        <Grid item xs={2} container alignItems="center">
        <Typography variant="h8" align="left">+{countryCode}</Typography>
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
              type: 'number', // Set the type to number
          }}
            margin="normal"
          />
        </Grid>
      </Grid>

      <Spacer size="30px" />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">Industry</Typography>
          <div>
            <Button
              variant="outlined"
              onClick={handleMenuOpen}
              sx={{ width: '200px' }}>
              {formData.industry || 'Select an industry'}
            </Button>
            <Menu
              anchorE1={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              {industries.map((industry, index) => (
                <MenuItem key={index} onClick={() => handleSelectIndustry(industry)}>
                  <Typography>{industry}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </div>
        </Box>

        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">Company Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="companyName"
            value={formData.companyName}
            onChange={handleCompanyNameChange}
            require
            margin="normal"
          />
        </Box>
      </Box>

      <Spacer size="50px" />
    </Container >
  );
};

export default TabZero;
