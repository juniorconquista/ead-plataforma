import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Message from './Message';
import chatSocket from '../../../containers/socketIo/Chat';

import './style.scss';

const AdminChat = props => {
    const {
        chat: {  messagesWaiting },
        getMessages,
        statusMessage,
        onMessageReceive,
        registerOnMessageReceive,
        onMessageUpdateReceive,
        registerOnMessageUpdateReceive,
        setMessage,
    } = props;

    useEffect(() => {
        getMessages();
        onMessageReceive(messageReceive);
        registerOnMessageReceive();
        onMessageUpdateReceive(messageUpdate);
        registerOnMessageUpdateReceive();
    }, []);

    const messageReceive = message => setMessage([message]);
    const messageUpdate = () => getMessages();

    return (
        <div className="chat__content-admin">
            <h1>Aprovações pendentes</h1>
            <div className="messages">
                {messagesWaiting
                    .filter(message => message.status !== 'approved')
                    .map(message => (
                        <Message
                            key={message._id}
                            message={message}
                            statusMessage={statusMessage}
                        />
                    ))
                    .reverse()}
            </div>
        </div>
    );
};

const mapState = state => ({
    auth: state.auth,
    chat: state.chat,
});

const mapDispatch = dispatch => ({
    getMessages: payload => dispatch.chat.getMessagesAsync(payload),
    statusMessage: payload => dispatch.chat.statusMessageAsync(payload),
    setMessage: payload => dispatch.chat.messagesWaitingReceived(payload),
});

export default compose(
    chatSocket,
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(AdminChat));
