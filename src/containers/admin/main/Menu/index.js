import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '@material-ui/core/Icon';

import { MainContentContext } from '../index';

import './style.scss';

const activeClass = (pathName, location) =>
    pathName.includes(location) ? 'active' : '';

const Menu = props => {
    const { togglMenu, isClose } = useContext(MainContentContext);
    const {
        location: { pathname },
    } = props;

    return (
        <div
            className={classnames({
                'menu-holder': true,
                close: isClose,
            })}
        >
            <button
                type="button"
                onClick={() => togglMenu(prevState => !prevState)}
                className="menu-holder__logo"
            >
               
                <Icon>keyboard_arrow_left</Icon>
            </button>
            <Link
                className={`menu-item ${activeClass(
                    pathname,
                    '/admin/settings',
                )}`}
                to="/admin/settings"
            >
                <Icon>settings</Icon>
                <p>Geral</p>
            </Link>
            <Link
                className={`menu-item ${activeClass(pathname, '/admin/slide')}`}
                to="/admin/slide"
            >
                <Icon>slideshow</Icon>
                <p>Slide</p>
            </Link>
            <Link
                className={`menu-item ${activeClass(pathname, '/admin/chat')}`}
                to="/admin/chat"
            >
                <Icon>chat</Icon>
                <p>Chat</p>
            </Link>
            <Link
                className={`menu-item ${activeClass(
                    pathname,
                    '/admin/status',
                )}`}
                to="/admin/status"
            >
                <Icon>group</Icon>
                <p>Status</p>
            </Link>
        </div>
    );
};

export default withRouter(memo(Menu));
