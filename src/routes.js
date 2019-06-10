import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoute from './containers/PrivateRoute';
import Webinar from './containers/Webinar';
import MainContainer from './containers/Admin';
import AdminChat from './components/admin/Chat';
import AdminSettings from './components/admin/Settings';
import AdminSlide from './components/admin/Slide';
import AdminStatus from './components/admin/Status';

const component = () => <></>;

export default () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Switch>
            <PrivateRoute path="/webinar" component={Webinar} />
            <MainContainer>
                <Switch>
                    <PrivateRoute exact path="/admin" component={component} />
                    <PrivateRoute path="/admin/chat" component={AdminChat} />
                    <PrivateRoute
                        path="/admin/settings"
                        component={AdminSettings}
                    />
                    <PrivateRoute
                        path="/admin/slide"
                        component={AdminSlide}
                    />
                    <PrivateRoute
                        path="/admin/status"
                        component={AdminStatus}
                    />
                    <Redirect to="/webinar" />
                </Switch>
            </MainContainer>
            <Redirect to="/webinar" />
        </Switch>
        <Redirect to="/login" />
    </Switch>
);
