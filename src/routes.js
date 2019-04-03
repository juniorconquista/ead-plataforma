import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import Webinar from './containers/Webinar';

// const component = () => <></>;

export default () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Switch>
            <PrivateRoute path="/webinar" component={Webinar} />
            <Redirect to="/webinar" />
        </Switch>
        <Redirect to="/login" />
    </Switch>
);
