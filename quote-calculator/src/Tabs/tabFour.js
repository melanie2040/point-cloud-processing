import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TextField, Button, Box, Typography, Container, Card, CardContent } from '@mui/material';

const TabFour = ({ formData, onFormDataChange }) => {
    const [date, setDate] = useState('');
    const [images, setImages] = useState([]);
    const [floorPlan, setFloorPlan] = useState([]);

    const handleCalendarChange = (newDate) => {
        onFormDataChange('calendar', newDate);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };

    const handleFloorPlanChange = (event) => {
        const files = Array.from(event.target.files);
        setFloorPlan(files);
    };

    const handleRemoveImage = (src) => {
        setImages(prevImages => prevImages.filter(image => image.src !== src));
    };


    const Spacer = ({ size }) => (
        <div style={{ height: size, width: '100%' }}></div>
    );

    const formattedDate = formData.calendar ? formData.calendar.toDateString() : 'No date selected';

    return (
        <Container sx={{ mt: 5, width: '100%' }}>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Please upload pictures of your site.</Typography>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-file"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-file">
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        <Box mt={2}>
                            <Typography variant="body1">Selected Files:</Typography>
                            <ul>
                                {images.map((file, index) => (
                                    <li key={index}>
                                        {file.name}
                                        <br />
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ width: '100px', height: 'auto', marginTop: '5px' }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">[Optional] Please upload a 2D floor plan.</Typography>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-floorplan-file"
                            type="file"
                            multiple
                            onChange={handleFloorPlanChange}
                        />
                        <label htmlFor="upload-floorplan-file">
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        <Box mt={2}>
                            <Typography variant="body1">Selected Files:</Typography>
                            <ul>
                                {floorPlan.map((file, index) => (
                                    <li key={index}>
                                        {file.name}
                                        <br />
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ width: '100px', height: 'auto', marginTop: '5px' }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography variant="h6">Calendar Booking for Scanning</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Calendar
                            onChange={handleCalendarChange}
                            value={formData.calendar}
                        />
                    </Box>
                    <Typography variant="h6">Selected Date: {formattedDate}</Typography>

                </CardContent>
            </Card>
            <Spacer size="50px" />

        </Container>


    );

}
export default TabFour;