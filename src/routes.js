import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import Webinar from './containers/Webinar';
import MainContainer from './containers/admin/main';
import AdminChat from './containers/admin/Chat';

const component = () => <></>;

export default () => (
    <Switch>
        <Route path="/login" component={Login} />

        <Switch>
            <PrivateRoute path="/webinar" component={Webinar} />
            <MainContainer>
                <Switch>
                    <PrivateRoute
                        exact
                        isAdmin
                        path="/admin"
                        component={component}
                    />
                    <PrivateRoute
                        isAdmin
                        path="/admin/chat"
                        component={AdminChat}
                    />
                    <Redirect to="/webinar" />
                </Switch>
            </MainContainer>
            <Redirect to="/webinar" />
        </Switch>
        <Redirect to="/login" />
    </Switch>
);
