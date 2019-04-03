import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { logout } from '../../state/context/auth/actions';

const PrivateRouter = ({ component, ...rest }) => {
    const {
        auth: { data },
        history: { location },
    } = rest;

    if (
        data &&
        data.SessionKey &&
        sessionStorage.getItem('SessionKey') &&
        data.isAcceptedLastUseTerm
    ) {
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
    component: PropTypes.node.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
    auth: state.auth,
});

/* istanbul ignore next */
const mapDispatchToProps = {
    logout: () => logout(),
};

/* istanbul ignore next */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(memo(PrivateRouter)));
