import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin'
import Cart from '../pages/Cart';
import NotFound from './notFound';
import history from './history';

function Routes() {
    return (
        <Router history={history} >
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute user="admin" path="/admin" exact component={Admin} />
                <PrivateRoute user="user" component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Routes;