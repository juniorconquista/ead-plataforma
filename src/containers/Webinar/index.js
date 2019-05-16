import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Player from '../../components/webinar/Player';
import Chat from '../../components/webinar/Chat';
import chatSocket from '../socketIo/Chat';

import './style.scss';

export const WebinarContentContext = React.createContext({});

const MINUTE = 60 * 1000;

const Webinar = props => {
    const {
        auth: { _id: userId, name, uuid, isAdmin },
        chat: { messages, countUsers },
        getMessages,
        sendMessage,
        onCount,
        registerOnCount,
        onMessageReceive,
        registerOnMessageReceive,
        onMessageUpdateReceive,
        registerOnMessageUpdateReceive,
        setMessageReceived,
        setcount,
        setStatus,
        deleteStatus,
    } = props;

    useEffect(() => {
        getMessages();
        onCount(connect);
        registerOnCount();
        onMessageReceive(messageReceive);
        registerOnMessageReceive();
        onMessageUpdateReceive(messageUpdate);
        registerOnMessageUpdateReceive();
        setStatus({
            uuid,
            name,
            isAdmin,
            date: new Date(),
        });
        const interval = setInterval(() => {
            setStatus({
                uuid,
                name,
                isAdmin,
                date: new Date(),
            });
        }, 1 * MINUTE);
        return () => {
            clearInterval(interval);
            deleteStatus(uuid);
        };
    }, []);

    const connect = count => setcount(count);
    const messageReceive = message => setMessageReceived([message]);
    const messageUpdate = () => getMessages();

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
    getMessages: () => dispatch.chat.getMessagesAsync(),
    sendMessage: payload => dispatch.chat.sendMessageAsync(payload),
    setMessageReceived: payload => dispatch.chat.messagesUpdate(payload),
    setcount: payload => dispatch.chat.count(payload),
    setStatus: payload => dispatch.status.setStatusAsync(payload),
    deleteStatus: payload => dispatch.status.deleteStatusAsync(payload),
});

export default compose(
    chatSocket,
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(Webinar));
