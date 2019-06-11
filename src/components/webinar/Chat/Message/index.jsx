import React, { memo } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { ReactComponent as IconClock } from '../../../../assets/icons/clock.svg';
import { ReactComponent as IconDetail } from '../../../../assets/icons/detalhe.svg';

import imgDefaultUser from '../../../../assets/images/img_user_default.png';

import './style.scss';

const Message = ({ message, userId }) => (
    <div>
        <div
            className={classnames({
                chat__message: true,
                you: userId !== message.sender._id,
                'await-approved': message.status !== 'approved',
            })}
        >
            <div className="box-message">
                <div className="message">
                    <div className="data">
                        <div className="sender">{message.sender.name}</div>
                        <div className="date">
                            {moment(message.createdAt).format(
                                'DD/MM/YYYY HH:mm',
                            )}
                        </div>
                        {message.status !== 'approved' && (
                            <div className="await-approve">
                                <IconClock />
                                <p>Aguardando aprovação </p>
                            </div>
                        )}
                    </div>
                    <div className="content-message">{message.text}</div>
                </div>
                <div className="arrow">
                    <IconDetail />
                </div>
            </div>
            <div className="box-user">
                <div className="user">
                    <img src={imgDefaultUser} alt="" />
                </div>
            </div>
        </div>
    </div>
);

export default memo(Message);
