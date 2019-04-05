import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Player from '../../components/webinar/Player';
import Chat from '../../components/webinar/Chat';
import chatSocket from '../socketIo/Chat';

import './style.scss';

export const WebinarContentContext = React.createContext({});

const Webinar = props => {
    const {
        auth: { _id: userId, name },
        chat: { messages, countUsers },
        getMessages,
        sendMessage,
        onCount,
        registerOnCount,
        onMessageReceive,
        registerOnMessageReceive,
        setMessage,
        setcount,
    } = props;

    useEffect(() => {
        getMessages();
        onCount(connect);
        registerOnCount();
        onMessageReceive(messageReceive);
        registerOnMessageReceive();
    }, []);

    const connect = count => setcount(count);
    const messageReceive = message => setMessage([message]);

    return (
        <WebinarContentContext.Provider
            value={{
                sendMessage,
                messages,
                userId,
                name,
            }}
        >
            <div className="webinar-page">
                <div className="webinar-page__top">
                    <Player />
                </div>
                <div className="webinar-page__info">
                    <div className="status-webinar">
                        <strong>status:</strong> <span>online</span>
                    </div>
                    <div className="only-users">
                        <strong>{countUsers}</strong> <span>online</span>
                    </div>
                </div>
                <div className="webinar-page__bottom">
                    <Chat />
                </div>
            </div>
        </WebinarContentContext.Provider>
    );
};

const mapState = state => ({
    auth: state.auth,
    chat: state.chat,
});

const mapDispatch = dispatch => ({
    getMessages: payload => dispatch.chat.getMessagesAsync(payload),
    sendMessage: payload => dispatch.chat.sendMessageAsync(payload),
    setMessage: payload => dispatch.chat.messages(payload),
    setcount: payload => dispatch.chat.count(payload),
});

export default compose(
    chatSocket,
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(Webinar));
