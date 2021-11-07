import { Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '../../Shared/Header/Header';

const Login = () => {
    const [loginData, setLoginData] = useState();
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(loginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>
            <Header></Header>
            <Container>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                        <Typography variant="h6" gutterBottom component="div">
                            Please Login
                        </Typography>
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', mt: 2 }}
                                name="email"
                                onBlur={handleOnBlur}
                                type="email"
                                label="Your Email"
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', mt: 2 }}
                                label="Your Password"
                                name="password"
                                onBlur={handleOnBlur}
                                type="password"
                                variant="standard" />
                            <Button sx={{ width: '75%', my: 4 }} type="submit" variant="contained">Login</Button>
                            <Link style={{ textDecoration: 'none' }} to="/register"><Button variant="text">New User? Please Register</Button></Link>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img width='100%' src="https://i.ibb.co/HPkX8y6/login.png" alt="img" />
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
};

export default Login;
