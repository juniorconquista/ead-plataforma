import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { validateRoutePermission } from '../../utils/private-route';

const PrivateRouter = ({ component, ...rest }) => {
    const {
        auth,
        history: { location },
    } = rest;

    if (auth && auth.accessToken && sessionStorage.getItem('accessToken')) {
        if (validateRoutePermission(rest.path, rest)) {
            return <Route {...rest} component={component} />;
        }
        return (
            <Redirect
                to={{
                    pathname: '/webinar',
                }}
            />
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: location },
            }}
        />
    );
};

PrivateRouter.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.node.isRequired,
        PropTypes.shape({}).isRequired,
    ]).isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(memo(PrivateRouter)));
