import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute(props) {

    const user = props.direct;
    
    if(user === "login") {
        const isLogged = !!localStorage.getItem('token-user');
        return isLogged ? <Route { ...props } /> : <Redirect to="/login" />
    }
    
    if(user === "home") {
        const isLogged = !!localStorage.getItem('token-admin');
        return isLogged ? <Route { ...props } /> : <Redirect to="/" />
    }


}