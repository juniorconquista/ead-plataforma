import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import imgDefaultUser from '../../../assets/images/img_user_default.png';
import './style.scss';

const Status = ({ status: { users }, getUsers }) => {
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="status__content-admin">
            <h1>Status</h1>
            <div className="status__content">
                <div className="actions">
                    <p>
                        <strong>Total: </strong> {users.length}
                    </p>
                    <button type="button" onClick={getUsers}>
                        Atualizar
                    </button>
                </div>
                <div className="list">
                    {users
                        .filter(
                            f => moment().diff(moment(f.date), 'minutes') <= 1,
                        )
                        .map(user => (
                            <div className="user">
                                <div className="image">
                                    <img src={imgDefaultUser} alt="" />
                                </div>
                                <div className="info">{user.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const mapState = state => ({
    status: state.status,
});

const mapDispatch = dispatch => ({
    getUsers: () => dispatch.status.getUsersAsync(),
});

export default compose(
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(Status));
