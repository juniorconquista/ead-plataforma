import React, { memo } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { ReactComponent as IconDetail } from '../../../../assets/icons/detalhe-admin.svg';
import { ReactComponent as IconApproved } from '../../../../assets/icons/aprovado.svg';
import { ReactComponent as IconRefused } from '../../../../assets/icons/reprovado.svg';

import imgDefaultUser from '../../../../assets/images/img_user_default.png';

import './style.scss';

const Message = ({ message, statusMessage }) => (
    <div
        className={classnames({
            chat__message: true,
            // 'await-approved': message.status !== 'approved',
        })}
    >
        <div className="box-message">
            <div className="message">
                <div className="data">
                    <div className="sender">{message.sender.name}</div>
                    <div className="date">
                        {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                    </div>
                </div>
                <div className="content-message">{message.text}</div>
                <div className="approved">
                    Deseja aprovar este comentário ?
                    <button
                        onClick={() =>
                            statusMessage({
                                id: message._id,
                                status: 'approved',
                            })
                        }
                    >
                        <IconApproved />
                    </button>
                    <button
                        onClick={() =>
                            statusMessage({
                                id: message._id,
                                status: 'rejected',
                            })
                        }
                    >
                        <IconRefused />
                    </button>
                </div>
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
);

export default memo(Message);
