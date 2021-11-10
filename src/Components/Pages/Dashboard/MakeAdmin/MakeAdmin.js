import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import useAuth from '../../../../Hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState()
    const { jwtToken } = useAuth();
    const [success, setSuccess] = useState(false);

    const handleEmail = e => {
        setEmail(e.target.value);
    }
    const handleAdmin = e => {
        const adminUser = { email };
        fetch('http://localhost:4000/users/admin', {
            method: "PUT",
            headers: {
                'authorization': `bearer ${jwtToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    console.log(data);
                }
            })
        e.preventDefault();

    };
    return (
        <div>
            <h2>Make Am Admin</h2>
            <form onSubmit={handleAdmin}>
                <TextField
                    sx={{ width: '50%' }}
                    onBlur={handleEmail}
                    name='email'
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="standard"
                />
                <Button type='submit' variant="contained">Add Admin</Button>
            </form>
            {success &&
                <Alert severity="success">Added Admin Successfully</Alert>
            }
        </div>
    );
};

export default MakeAdmin;