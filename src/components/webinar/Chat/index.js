import React, { memo, useContext } from 'react';
import { WebinarContentContext } from '../../../containers/Webinar';
import Message from './Message';
// import SendMessage from './SendMessage';

import './style.scss';

const Chat = () => {
    const { messages, userId } = useContext(WebinarContentContext);
    console.log(messages);
    return (
        <div className="chat__content">
            {messages.map(message => (
                <Message message={message} userId={userId} />
            ))}
            {/* <SendMessage /> */}
        </div>
    );
};

export default memo(Chat);
