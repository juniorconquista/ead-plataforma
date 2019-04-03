import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
// import PrivateRoute from './containers/PrivateRoute';
// import Dashboard from './containers/Dashboard';

// const component = () => <></>;

export default () => (
    <Switch>
        <Route path="/login" component={Login} />
        {/* <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/dashboard" /> 
        </Switch> */}
    </Switch>
);
