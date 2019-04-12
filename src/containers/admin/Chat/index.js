import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from '@material-ui/core/Button';

import Message from './Message';
import chatSocket from '../../socketIo/Chat';

import './style.scss';

const AdminChat = props => {
    const {
        auth: { _id: userId },
        chat: { messages, messagesWaiting },
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
        <div className="chat__content chat__content-admin">
            <div className="title">
                Mensagens Pendentes - {messagesWaiting.length}
            </div>
            <div className="chat__accepted-message">
                {messagesWaiting
                    .filter(
                        message =>
                            message.status !== 'rejected' &&
                            message.status !== 'approved',
                    )
                    .map(item => (
                        <>
                            <div className="message">{item.text}</div>
                            <div className="actions">
                                <div className="info-message">
                                    <div className="sender">
                                        {item.sender.name}
                                    </div>
                                    <div className="date">
                                        {moment(item.createdAt).format(
                                            'DD/MM/YYYY HH:mm',
                                        )}
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button
                                        onClick={() =>
                                            statusMessage({
                                                id: item._id,
                                                status: 'rejected',
                                            })
                                        }
                                        type="button"
                                        color="primary"
                                        variant="contained"
                                        className="refused"
                                    >
                                        Recusar
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            statusMessage({
                                                id: item._id,
                                                status: 'approved',
                                            })
                                        }
                                        type="button"
                                        color="primary"
                                        variant="contained"
                                        className="accepted"
                                    >
                                        Aceitar
                                    </Button>
                                </div>
                            </div>
                        </>
                    ))
                    .slice(0, 1)}
            </div>
            <div className="title">Chat</div>
            <div className="chat__messages">
                <div className="list">
                    {messages
                        .map(
                            message =>
                                message &&
                                message.status !== 'waiting' && (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        userId={userId}
                                    />
                                ),
                        )
                        .reverse()}
                </div>
            </div>
            <div className="player">
                <div className="info">
                    Aguarde a transmissão vai começar em breve
                </div>
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
