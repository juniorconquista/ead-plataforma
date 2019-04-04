import React, { memo } from 'react';
import classnames from 'classnames';

import './style.scss';

const Message = props => {
    const { message, userId } = props;
    return (
        <div
            className={classnames({
                chat__message: true,
                you: userId === message.idSender,
            })}
        >
            {userId !== message.idSender && (
                <div className="info-message">
                    <div className="sender">{message.sender}</div>
                    <div className="date">{message.date}</div>
                </div>
            )}
            <div
                className={classnames({
                    message: true,
                    you: userId === message.idSender,
                })}
            >
                {message.text}
            </div>
            {userId === message.idSender && (
                <div className="info-message">
                    <div className="sender">{message.sender}</div>
                    <div className="date">{message.date}</div>
                </div>
            )}
        </div>
    );
};

export default memo(Message);
