import React, { memo, useContext } from 'react';
import { WebinarContentContext } from '../../../containers/Webinar';
import Message from './Message';
import SendMessage from './SendMessage';

import './style.scss';

const Chat = () => {
    const { sendMessage, messages, userId, name } = useContext(
        WebinarContentContext,
    );
    return (
        <div className="chat__content">
            <div className="chat__messages">
                {messages
                    .map(
                        message =>
                            message &&
                            (message.status === 'approved' ||
                                userId === message.sender._id) && (
                                <Message
                                    key={message._id}
                                    message={message}
                                    userId={userId}
                                />
                            ),
                    )
                    .reverse()}
            </div>
            <SendMessage
                sendMessage={sendMessage}
                name={name}
                userId={userId}
            />
        </div>
    );
};

export default memo(Chat);
