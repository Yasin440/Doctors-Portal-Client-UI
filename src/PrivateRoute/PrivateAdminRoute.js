import { CircularProgress } from '@mui/material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateAdminRoute = ({ children, ...rest }) => {
    const { user, loading, admin } = useAuth();
    if (loading) {
        return <CircularProgress sx={{ my: 3 }} />
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && admin ? children : <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                ></Redirect>

            }
        >

        </Route>
    );
};

export default PrivateAdminRoute;