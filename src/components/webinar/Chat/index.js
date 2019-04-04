import React, { memo, useContext } from 'react';
import { WebinarContentContext } from '../../../containers/Webinar';
import Message from './Message';
import SendMessage from './SendMessage';

import './style.scss';

const Chat = () => {
    const { messages, userId } = useContext(WebinarContentContext);
    return (
        <div className="chat__content">
            <div className="chat__messages">
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                        userId={userId}
                    />
                ))}
            </div>
            <SendMessage />
        </div>
    );
};

export default memo(Chat);
