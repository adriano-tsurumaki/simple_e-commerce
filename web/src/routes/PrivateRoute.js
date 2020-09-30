import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute(props) {

    const user = props.user;
    
    if(user === "user") {
        const isLogged = !!localStorage.getItem('token-user');
        return isLogged ? <Route { ...props } /> : <Redirect to="/login" />
    }
    
    if(user === "admin") {
        const isLogged = !!localStorage.getItem('token-admin');
        return isLogged ? <Route { ...props } /> : <Redirect to="/" />
    }


}