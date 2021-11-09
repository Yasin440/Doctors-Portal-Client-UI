import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../../Hooks/useAuth';

const BookingModal = ({ BookingOpen, handleBookingClose, booking, date, setSuccessBookedAppointment }) => {
    const { name, time } = booking;
    const { user } = useAuth();
    const initialInfo = { patientName: user.displayName, email: user.email, phone: '' };
    const [bookAppointment, setBookAppointment] = useState(initialInfo);
    const appointmentInfo = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookAppointment };
        newInfo[field] = value;
        // console.log(newInfo);
        setBookAppointment(newInfo);
    }

    const handleBooking = e => {
        //collect data
        const appointment = {
            ...bookAppointment,
            time: time,
            date: date.toDateString(),
            serviceName: name
        }
        fetch('http://localhost:4000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccessBookedAppointment(true);
                    handleBookingClose();
                }
            })
        e.preventDefault();
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={BookingOpen}
            onClose={handleBookingClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={BookingOpen}>
                <Box sx={style}>
                    <Typography sx={{ fontWeight: '500', color: '#1976D2' }} variant="h5" gutterBottom component="div">
                        {name}
                    </Typography>
                    <form onSubmit={handleBooking}>
                        <TextField
                            required
                            sx={{ width: '100%', m: '1.2rem auto' }}
                            id="outlined-size-small"
                            name="patientName"
                            onBlur={appointmentInfo}
                            defaultValue={user?.displayName}
                            placeholder="Your Name"
                            size="small"
                        />
                        <TextField
                            required
                            sx={{ width: '100%', m: '1.2rem auto' }}
                            id="outlined-size-small"
                            name='email'
                            onBlur={appointmentInfo}
                            defaultValue={user?.email}
                            placeholder='Email'
                            size="small"
                        />
                        <TextField
                            sx={{ width: '100%', m: '1.2rem auto' }}
                            id="outlined-size-small"
                            name='phone'
                            onBlur={appointmentInfo}
                            placeholder="Mobile Number"
                            size="small"
                        />
                        <TextField
                            sx={{ width: '100%', m: '1.2rem auto' }}
                            disabled
                            id="outlined-size-small"
                            defaultValue={date.toDateString()}
                            placeholder="Date"
                            size="small"
                        />
                        <TextField
                            sx={{ width: '100%', m: '1.2rem auto' }}
                            disabled
                            placeholder='Time'
                            id="outlined-size-small"
                            defaultValue={time}
                            size="small"
                        />
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookingModal;