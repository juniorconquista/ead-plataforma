import React, { memo, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';

import { connect } from 'react-redux';

import './style.scss';

const AdminStatus = props => {
    const {
        status: { users },
        getUsers,
    } = props;

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="status__content-admin">
            <div className="status-header">
                <div className="title">Usuários Online</div>
                <div className="actions">
                    <p>
                        <strong>Total: </strong> {users.length}
                    </p>
                    <button type="button" onClick={getUsers}>
                        <Icon>autorenew</Icon>
                        atualizar
                    </button>
                </div>
            </div>
            <div className="status__users">
                <div className="list">
                    {users
                        .filter(
                            f => moment().diff(moment(f.date), 'minutes') <= 1,
                        )
                        .map(user => (
                            <div className="user">{user.name}</div>
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

export default connect(
    mapState,
    mapDispatch,
)(memo(AdminStatus));
