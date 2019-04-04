import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PrivateRouter = ({ component, ...rest }) => {
    const {
        auth,
        history: { location },
    } = rest;

    if (auth && auth.accessToken && sessionStorage.getItem('accessToken')) {
        return <Route {...rest} component={component} />;
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
    component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(memo(PrivateRouter)));
