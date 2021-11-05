import React from 'react';
import { Container, Grid } from '@mui/material';
import Calender from '../../../Shared/Calender/Calender';

const AppointmentBanner = ({ date, setDate }) => {
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Calender date={date} setDate={setDate}></Calender>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '100%' }} src="https://i.ibb.co/3m3JG06/chair.png" alt="img" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AppointmentBanner;