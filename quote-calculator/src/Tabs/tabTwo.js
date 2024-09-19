import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initMap } from '../Components/BackupMap';
import Map from './../Components/LeafletMap';
//import OneMap from '../Components/Map';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography, Container, Card, CardContent, TextField, Button } from '@mui/material';

// const Map = ({ postalCode })=>{
//     useEffect(()=>{
//         if(postalCode){
//             initMap(postalCode);
//         }
//     }, [postalCode]);
//     return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
// };


const TabTwo = ({ formData, onFormDataChange }) => {
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const apiKey = 'a55f4d3770f940e8b31fa151a2dc0246';

    const Spacer = ({ size }) => (
        <div style={{ height: size, width: '100%' }}></div>
    );


    const handleNeedsChange = (e) => {
        const { value } = e.target;
        onFormDataChange('qn4', value);
    }
    const handlePostalCodeChange = (e) => {
        const { value } = e.target;
        onFormDataChange('qn5', value);

        // if(value.length!=6){
        //     setError('Invalid postal code');
        // }else{

        //     setError(null);
        // }
    }

    const handleAddress = (value)=>{
        setAddress(value);
    }

    const handleQuestion1Change = (e) => {
        const { value } = e.target;
        onFormDataChange('qn6', value);
    }
    const handleQuestion2Change = (e) => {
        const { value } = e.target;
        onFormDataChange('qn7', value);
    }
    const handleQuestion3Change = (e) => {
        const { value } = e.target;
        onFormDataChange('qn8', value);
    }

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
        <Container sx={{ mt: 5, width: '100%' }}>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <FormControl component="fieldset">
                        <Typography variant="h6">My site needs</Typography>
                        <RadioGroup
                            row // Use `row` for horizontal layout, omit for vertical
                            value={formData.qn4}
                            onChange={handleNeedsChange}
                            sx={{ justifyContent: 'center' }}
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
                            <FormControlLabel
                                value="Both"
                                control={<Radio />}
                                label="Both"
                            />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6">Postal Code</Typography>
                    <TextField
                        value={formData.qn5}
                        onChange={handlePostalCodeChange}
                        variant="outlined"
                        inputProps={{
                            minLength: 6,
                            maxLength: 6, // Limit input to 6 characters
                            type: 'number', // Set the type to number
                        }}
                        error={!!error}
                        helperText={error}
                        fullWidth
                        
                    />
                    <Spacer size="10px" />
               {<Map postalCode={formData.qn5} />}
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Will we have access to any dangerous or mid/pre construction sites?</Typography>
                        <RadioGroup
                            row // Use `row` for horizontal layout, omit for vertical
                            value={formData.qn6}
                            onChange={handleQuestion1Change}
                            sx={{ justifyContent: 'center' }}
                        >
                            <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Do you require our scanners to be accompanied at all times?</Typography>
                        <RadioGroup
                            row // Use `row` for horizontal layout, omit for vertical
                            value={formData.qn7}
                            onChange={handleQuestion2Change}
                            sx={{ justifyContent: 'center' }}
                        >
                            <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Will our team need PPE gear ? (E.G. helmet/construction boots/high visibility vest)</Typography>
                        <RadioGroup
                            row // Use `row` for horizontal layout, omit for vertical
                            value={formData.qn8}
                            onChange={handleQuestion3Change}
                            sx={{ justifyContent: 'center' }}
                        >
                            <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
            <Spacer size="50px" />
        </Container>

    );
};

export default TabTwo;