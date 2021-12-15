import React from 'react';
import {Redirect} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    return !localStorage.getItem('auth') ? (
        <Redirect to={{pathname: '/login'}}/>
        ) : (
        <> {children}</>
      );
}

export default PrivateRoute;
