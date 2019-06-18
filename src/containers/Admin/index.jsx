import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as IconNotification } from '../../assets/icons/sino.svg';
import { ReactComponent as IconPresentation } from '../../assets/icons/slide.svg';
import { ReactComponent as IconMessages } from '../../assets/icons/chat.svg';
import { ReactComponent as IconStatus } from '../../assets/icons/status.svg';
import { ReactComponent as IconSettings } from '../../assets/icons/geral.svg';

import { ReactComponent as LOGO } from '../../assets/icons/logo-admin.svg';
import imgDefaultUser from '../../assets/images/img_user_default.png';

import './style.scss';

export const MainContentContext = React.createContext({});

const activeClass = (pathName, location) =>
    pathName.includes(location) ? 'active' : '';

const Main = props => {
    const {
        children,
        auth: { name },
        chat: { messagesWaiting },
        location: { pathname },
    } = props;

    return (
        <MainContentContext.Provider
            value={{
                name,
            }}
        >
            <div className="admin-page">
                <div className="header">
                    <div className="logo">
                        <LOGO />
                    </div>
                    <div className="user">
                        <div className="notification">
                            <IconNotification />
                            <div className="bagde">
                                {messagesWaiting.length}
                            </div>
                        </div>
                        <div className="img">
                            <img src={imgDefaultUser} alt="" />
                        </div>
                    </div>
                </div>
                <div className="info-admin">
                    <h1>
                        Bem vindo <span>{name}</span> !
                    </h1>
                    <h3>Aqui você administra sua plataforma</h3>
                </div>
                <div className="content">
                    <div className="menu">
                        <Link
                            className={`menu-item ${activeClass(
                                pathname,
                                '/admin/settings',
                            )}`}
                            to="/admin/settings"
                        >
                            <IconSettings />
                            <p>Geral</p>
                        </Link>
                        <Link
                            className={`menu-item ${activeClass(
                                pathname,
                                '/admin/slide',
                            )}`}
                            to="/admin/slide"
                        >
                            <IconPresentation />
                            <p>Slide</p>
                        </Link>
                        <Link
                            className={`menu-item ${activeClass(
                                pathname,
                                '/admin/chat',
                            )}`}
                            to="/admin/chat"
                        >
                            <IconMessages />
                            <p>Chat</p>
                        </Link>
                        <Link
                            className={`menu-item ${activeClass(
                                pathname,
                                '/admin/status',
                            )}`}
                            to="/admin/status"
                        >
                            <IconStatus />
                            <p>Status</p>
                        </Link>
                    </div>
                    <div className="app">{children}</div>
                </div>
                <div className="menu-mobile">
                    {/* <button>
                        <IconUser />
                    </button> */}
                    <Link
                        className={`menu-item ${activeClass(
                            pathname,
                            '/admin/settings',
                        )}`}
                        to="/admin/settings"
                    >
                        <IconSettings />
                    </Link>
                    <Link
                        className={`menu-item ${activeClass(
                            pathname,
                            '/admin/slide',
                        )}`}
                        to="/admin/slide"
                    >
                        <IconPresentation />
                    </Link>
                    <Link
                        className={`menu-item ${activeClass(
                            pathname,
                            '/admin/chat',
                        )}`}
                        to="/admin/chat"
                    >
                        <IconMessages />
                    </Link>
                    <Link
                        className={`menu-item ${activeClass(
                            pathname,
                            '/admin/status',
                        )}`}
                        to="/admin/status"
                    >
                        <IconStatus />
                    </Link>
                </div>
            </div>
        </MainContentContext.Provider>
    );
};

const mapState = state => ({
    auth: state.auth,
    chat: state.chat,
});

export default connect(mapState)(memo(Main));
