import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    const menu = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        Doctors Portal
                    </Typography>
                    <div>
                        <Link style={menu} to='/home'><Button sx={{ fontWeight: 600 }} color="inherit">Home</Button></Link>
                        <Link style={menu} to='/appointment'><Button sx={{ fontWeight: 600 }} color="inherit">Appointment</Button></Link>
                        {user?.email ?
                            <>
                                <Link style={menu} to='/dashboard'><Button sx={{ fontWeight: 600 }} color="inherit">Dashboard</Button></Link>
                                <Link
                                    onClick={logOut}
                                    style={menu}
                                    to='/login'>
                                    <Button sx={{ fontWeight: 600 }} color="inherit">LogOut</Button>
                                </Link>
                                <small>as: {user.displayName}</small>
                            </>
                            :
                            <Link
                                style={menu}
                                to='/login'>
                                <Button sx={{ fontWeight: 600 }} color="inherit">Login</Button>
                            </Link>

                        }


                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;