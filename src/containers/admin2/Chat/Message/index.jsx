import React, { memo } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { ReactComponent as IconClock } from '../../../../assets/icons/clock.svg';

import './style.scss';

const Message = ({ message, userId }) => (
    <div
        className={classnames({
            chat__message: true,
            you: userId === message.sender._id,
            'await-approved':
                message.status !== 'approved' && message.status !== 'rejected',
        })}
    >
        <div className="container-message">
            {userId === message.sender._id && (
                <div className="info-message you">
                    <div className="sender">{message.sender.name}</div>
                    <div className="date">
                        {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                    </div>
                    {message.status !== 'approved' && (
                        <div className="await-approve">
                            {message.status !== 'rejected' && <IconClock />}
                            <span>
                                {message.status === 'rejected'
                                    ? 'Reijeitada'
                                    : 'Aguardando aprovação'}
                            </span>
                        </div>
                    )}
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
            {userId !== message.sender._id && (
                <div className="info-message">
                    <div className="sender">{message.sender.name}</div>
                    <div className="date">
                        {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                    </div>
                    {message.status !== 'approved' && (
                        <div className="await-approve">
                            {message.status !== 'rejected' && <IconClock />}
                            <span>
                                {message.status === 'rejected'
                                    ? 'Reijeitada'
                                    : 'Aguardando aprovação'}
                            </span>
                        </div>
                    )}
                </div>
            )}
            {message.status === 'rejected' && (
                <div className="reject-message" />
            )}
        </div>
    </div>
);

export default memo(Message);
