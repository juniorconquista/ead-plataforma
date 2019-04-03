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
            <div
                className={classnames({
                    message: true,
                    you: userId === message.idSender,
                })}
            >
                {message.text}
            </div>
        </div>
    );
};

export default memo(Message);
