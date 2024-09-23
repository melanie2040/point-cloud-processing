import React, { useState, forwardRef } from 'react';
import { TextField, Button, Box, Typography, Container, Card, CardContent, CardHeader, Grid } from '@mui/material';

const TabSix = ({ formData, onFormDataChange }) => {
    const Spacer = ({ size }) => (
        <div style={{ height: size, width: '100%' }}></div>
    );

    const formattedDate = formData.calendar ? formData.calendar.toDateString() : 'No date selected';


    return (
        <Container sx={{ mt: 5, width: '100%' }}>
            <Card variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
                Thank you for your submission. A salesperson will be in contact with you shortly. A copy of your quote estimation has been emailed to your provided email address.
            </Card>
            <Spacer size="50px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <Typography variant="h6" align="left">Full name</Typography>
                            <Typography variant="body1" align="left">
                                {formData.firstName} {formData.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography variant="h6" align="left">Contact</Typography>
                            <Typography variant="body1" align="left">
                                +{formData.countryCode} {formData.contact}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Email</Typography>
                            <Typography variant="body1" align="left">
                                {formData.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Country</Typography>
                            <Typography variant="body1" align="left">
                                {formData.country}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Industry</Typography>
                            <Typography variant="body1" align="left">
                                {formData.industry}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Company</Typography>
                            <Typography variant="body1" align="left">
                                {formData.companyName}
                            </Typography>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">You need your 3D scanning for: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn1}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">You want to scan: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">File Export Format: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn3}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Your site needs: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn4}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Address: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.street}, {formData.unit}, {formData.city}, {formData.state}, {formData.countryTwo}, {formData.postalCode},
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Will we have access to any dangerous or mid/pre construction sites? </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn6}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Do you require our scanners to be accompanied at all times? </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn7}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" align="left">Will our team need PPE gear? </Typography>
                            <Typography variant="body1" align="left">
                                {formData.qn8}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4}>
                            <Typography variant="h6" align="left">Width: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.width}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Typography variant="h6" align="left">Length: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Typography variant="h6" align="left">Height: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.height}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography variant="h6" align="left">Volume: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.volume}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography variant="h6" align="left">Estimated Quote: </Typography>
                            <Typography variant="body1" align="left">
                                {formData.quote}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Spacer size="30px" />
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" align="left">Scanning Date: {formattedDate}</Typography>
                </CardContent>
            </Card>

            <Spacer size="50px" />
        </Container>
    )

};
export default TabSix;