import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const TabThree = ({ formData, onFormDataChange, errors }) => {
  const [widthError, setWidthError] = useState(null);
  const [lengthError, setLengthError] = useState(null);
  const [heightError, setHeightError] = useState(null);

  const [volumeError, setVolumeError] = useState(null);

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/tab2');  // Navigate to Tab 1 when the button is clicked
  };

  const handleNext = () => {
    if (!formData.width) {
      setWidthError("Please fill in this field");
    }

    if (!formData.length) {
      setLengthError("Please fill in this field");
    }

    if (!formData.height) {
      setHeightError("Please fill in this field");
    }

    if (formData.width && formData.length && formData.height && !widthError && !heightError && !lengthError) {
      const volume = formData.width * formData.length * formData.height;
      if(volume < 1){
        alert("Invalid scanning volume");
      }else{
        onFormDataChange("volume", volume);
        const quote = calculateQuote(volume);
        onFormDataChange("quote", quote);
        navigate("/tab4");
      }
    }
  };

  const calculateQuote = (volume)=>{
    var quote = 0;
    if(volume >= 1 && volume <= 20000){
      quote = 0.005 * volume;
    }else if (volume > 20000 && volume <= 250000){
      quote = 0.004 * volume;
    }else if (volume > 250000 && volume <=1000000){
      quote = 0.003 * volume;
    }else if (volume > 1000000 && volume <= 10000000){
      quote = 0.002 * volume;
    }else{
      quote = 'Please contact us for a quote';
    }

    if(quote.type === Number){
      const threeHourBlocks = volume / 15000;
      if(volume%15000 != 0){
        threeHourBlocks++;
      }
      //dashpack charge
      const dashPackCharge = 400 * threeHourBlocks;
      quote += dashPackCharge;

      //manpower charge
      const manpowerCharge = 35 * 3 * threeHourBlocks;
      quote += manpowerCharge;

      //transport charge
      const sixHourBlocks = threeHourBlocks / 2;
      if(threeHourBlocks %2 != 0){
        sixHourBlocks++;
      }
      const transportCharge = 100 * sixHourBlocks;
      quote += transportCharge;

    }

    return quote;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    //setWidth(value);
    onFormDataChange(name, value);

    //calculateVolume();
  };

  const Spacer = ({ size }) => (
    <div style={{ height: size, width: "100%" }}></div>
  );

  const formatQuote = (quote) => {
    const parsedQuote = parseFloat(quote);
    if (!isNaN(parsedQuote)) {
      return `${parsedQuote.toFixed(6)}`;
    }
  };

  return (
    <Container sx={{ mt: 5, width: "100%" }}>
      <Typography variant="h6" align="center">
        Scanning Dimensions
      </Typography>
      <Spacer size="30px" />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            Width (metres)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            require
            inputProps={{
              type: "number", // Set the type to number
            }}
            //error={!!widthError}
            //helperText={widthError}
            margin="normal"
          />
          {errors.width && !formData.width && <span style={{ color: 'red' }}>{errors.width}</span>}
        </Box>

        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            Length (metres)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            require
            inputProps={{
              type: "number", // Set the type to number
            }}
            //error={!!lengthError}
            //helperText={lengthError}
            margin="normal"
          />
          {errors.length && !formData.length && <span style={{ color: 'red' }}>{errors.length}</span>}
        </Box>

        <Box flex={1} mr={2} minWidth="250px">
          <Typography variant="h6" align="left">
            Height (metres)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            require
            inputProps={{
              type: "number", // Set the type to number
            }}
            //error={!!heightError}
            //helperText={heightError}
            margin="normal"
          />
          {errors.height && !formData.height && <span style={{ color: 'red' }}>{errors.height}</span>}
        </Box>

      </Box>

    </Container>

    // <div className="row justify-content-center">
    //     <div className="row justify-content-center">
    //         <div className="col-9">
    //             <h6 style={{ textAlign: 'left' }}>
    //                 Scanning Dimensions
    //             </h6>
    //         </div>
    //     </div>
    //     <div className="row justify-content-center">
    //         <div className="col-lg-3">
    //             <div class="input-group mb-3">
    //                 <div className="input-group-prepend">
    //                     <span className="input-group-text">Width</span>
    //                 </div>
    //                 <input
    //                     type="number"
    //                     id="width"
    //                     name="width"
    //                     class="form-control"
    //                     value={formData.width}
    //                     onChange={handleChange}
    //                     required
    //                     min="0"
    //                 />
    //                 <div class="input-group-append">
    //                     <span class="input-group-text" id="basic-addon2">
    //                         m
    //                     </span>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="col-lg-3">
    //             <div class="input-group mb-3">
    //                 <div className="input-group-prepend">
    //                     <span className="input-group-text">Length</span>
    //                 </div>
    //                 <input
    //                     type="number"
    //                     id="length"
    //                     name="length"
    //                     class="form-control"
    //                     value={formData.length}
    //                     onChange={handleChange}
    //                     required
    //                     min="0"
    //                 />
    //                 <div class="input-group-append">
    //                     <span class="input-group-text" id="basic-addon2">
    //                         m
    //                     </span>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="col-lg-3">
    //             <div class="input-group mb-3">
    //                 <div className="input-group-prepend">
    //                     <span className="input-group-text">Height</span>
    //                 </div>
    //                 <input
    //                     type="number"
    //                     id="height"
    //                     name="height"
    //                     class="form-control"
    //                     value={formData.height}
    //                     onChange={handleChange}
    //                     required
    //                     min="0"
    //                 />
    //                 <div class="input-group-append">
    //                     <span class="input-group-text" id="basic-addon2">
    //                         m
    //                     </span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     {error && <div className="error-message" style={{ width: "90%" }}>{error}</div>}
    //     {/* <div className="row justify-content-center">
    //         <button
    //             type="button"
    //             class="btn btn-primary mt-2 mb-2"
    //             onClick={calculateQuote}
    //             style={{ width: "200px" }}
    //         >
    //             Get Quote Estimate
    //         </button>
    //     </div>

    //     <div
    //         class="card bg-light"
    //         style={{ maxWidth: "450px", margin: "0 auto" }}
    //     >
    //         <div class="card-body">
    //             <p style={{ fontWeight: "bold" }}>
    //                 Total volume: {formData.volume} m&sup3;
    //             </p>
    //             <p style={{ fontWeight: "bold" }}>

    //                 Calculated Quote: {formData.quote}
    //             </p>
    //         </div>
    //     </div> */}

    // </div>
  );
};

export default TabThree;
