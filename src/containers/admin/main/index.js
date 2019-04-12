import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import imgDefaultUser from '../../../assets/images/img_user_default.png';
import Menu from './Menu';
import './style.scss';

export const MainContentContext = React.createContext({});

const Main = props => {
    const {
        children,
        auth: { name },
        chat: { messagesWaiting },
    } = props;

    const [isClose, togglMenu] = useState(false);
    const classes = classnames({
        'home-holder': true,
        close: isClose,
    });

    return (
        <MainContentContext.Provider
            value={{
                togglMenu,
                isClose,
                name,
            }}
        >
            <Menu togglMenu={togglMenu} isClose={isClose} />
            <div className={classes}>
                <div className="header">
                    <div className="welcome-header">
                        Bem vindo <span>{name}</span> !
                    </div>
                    <div className="info-header">
                        <div className="user-header">
                            <img src={imgDefaultUser} alt="" />
                        </div>
                        <Badge
                            className={classes.margin}
                            badgeContent={messagesWaiting.length}
                            color="error"
                        >
                            <Icon>notifications</Icon>
                        </Badge>
                    </div>
                </div>
                <div className="content">{children}</div>
            </div>
        </MainContentContext.Provider>
    );
};

const mapState = state => ({
    auth: state.auth,
    chat: state.chat,
});

export default connect(mapState)(memo(Main));
