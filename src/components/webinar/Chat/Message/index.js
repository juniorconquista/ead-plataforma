import React, { memo } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import './style.scss';

const Message = ({ message, userId }) => (
    <div
        className={classnames({
            chat__message: true,
            you: userId === message.sender._id,
        })}
    >
        {userId !== message.sender._id && (
            <div className="info-message">
                <div className="sender">{message.sender.name}</div>
                <div className="date">
                    {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
            </div>
        )}
        <div
            className={classnames({
                message: true,
                you: userId === message.sender._id,
            })}
        >
            {message.text}
        </div>
        {userId === message.sender._id && (
            <div className="info-message">
                <div className="sender">{message.sender.name}</div>
                <div className="date">
                    {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
            </div>
        )}
    </div>
);

export default memo(Message);
