import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    return !localStorage.getItem('auth') ? (
        <Redirect to={{pathname: '/login'}}/>
        ) : (
        <> {children}</>
      );
}

export default PrivateRoute;
