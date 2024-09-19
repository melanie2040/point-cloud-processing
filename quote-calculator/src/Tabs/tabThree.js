import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Typography, Box } from '@mui/material';


const TabThree = ({ formData, onFormDataChange }) => {

    const [widthError, setWidthError] = useState(null);
    const [lengthError, setLengthError] = useState(null);
    const [heightError, setHeightError] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        //setWidth(value);
        onFormDataChange(name, value);
        if (name == "width") {
            if (value <= 0) {
                setWidthError('Invalid value entered');
            } else {
                setWidthError(null);
            }

        } else if (name == "length") {
            if (value <= 0) {
                setLengthError('Invalid value entered');
            } else {
                setLengthError(null);
            }
        } else if (name == "height") {
            if(value <=0){
                setHeightError('Invalid value entered');
            }else{
                setHeightError(null);
            }
            
        }

        //calculateVolume();
    }



    const Spacer = ({ size }) => (
        <div style={{ height: size, width: '100%' }}></div>
    );


    const formatQuote = (quote) => {
        const parsedQuote = parseFloat(quote);
        if (!isNaN(parsedQuote)) {
            return `${parsedQuote.toFixed(6)}`;
        }

    };


    return (
        <Container sx={{ mt: 5, width: '100%' }}>
            <Typography variant="h6" align="center">Scanning Dimensions</Typography>
            <Spacer size="30px" />

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                <Box flex={1} mr={2} minWidth="250px">
                    <Typography variant="h6" align="left">Width (metres)</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="width"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        require
                        inputProps={{
                            type: 'number', // Set the type to number
                        }}
                        error={!!widthError}
                        helperText={widthError}
                        margin="normal"
                    />
                </Box>
                <Box flex={1} mr={2} minWidth="250px">
                    <Typography variant="h6" align="left">Length (metres)</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="length"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        require
                        inputProps={{
                            type: 'number', // Set the type to number
                        }}
                        error={!!lengthError}
                        helperText={lengthError}
                        margin="normal"
                    />
                </Box>
                <Box flex={1} mr={2} minWidth="250px">
                    <Typography variant="h6" align="left">Height (metres)</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        require
                        inputProps={{
                            type: 'number', // Set the type to number
                        }}
                        error={!!heightError}
                        helperText={heightError}
                        margin="normal"
                    />
                </Box>
            </Box>

            <Spacer size="50px" />

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