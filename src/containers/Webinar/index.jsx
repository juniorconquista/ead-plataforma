import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Player from '../../components/webinar/Player';
import Chat from '../../components/webinar/Chat';
import chatSocket from '../socketIo/Chat';

import { ReactComponent as IconMessages } from '../../assets/icons/mensagens.svg';
import { ReactComponent as IconPresentation } from '../../assets/icons/apresentacao.svg';
import { ReactComponent as IconNotification } from '../../assets/icons/sino.svg';
import { ReactComponent as IconUser } from '../../assets/icons/user.svg';

import LOGO from '../../assets/icons/logo.svg';
import imgDefaultUser from '../../assets/images/img_user_default.png';

import './style.scss';

export const WebinarContentContext = React.createContext({});

const MINUTE = 60 * 1000;

const Webinar = props => {
    const {
        auth: { _id: userId, name, uuid, isAdmin },
        settings: { configuration },
        chat: { messages },
        history: { push },
        getConfiguration,
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
        if (isAdmin) {
            push('/admin');
        }
        getConfiguration();
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
                configuration,
                sendMessage,
                messages,
                userId,
                name,
            }}
        >
            <div className="webinar-page">
                <div className="header">
                    <div className="logo">
                        <img src={LOGO} alt="education" />
                    </div>
                    <div className="user">
                        <div className="notification">
                            <IconNotification />
                            <div className="bagde">2</div>
                        </div>
                        <div className="img">
                            <img src={imgDefaultUser} alt="" />
                        </div>
                    </div>
                </div>
                <div className="info-video">
                    <h1>Lingua Portuguesa</h1>
                    <h3>Como interpretar textos</h3>
                </div>
                <div className="content">
                    <div className="box">
                        <Player />
                        <Chat />
                        <div className="tabs">
                            <button className="active">
                                <IconMessages />
                            </button>
                            <button>
                                <IconPresentation />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="menu-mobile">
                    <button>
                        <IconUser />
                    </button>
                    <button className="active">
                        <IconMessages />
                    </button>
                    <button>
                        <IconPresentation />
                    </button>
                    <button>
                        <IconNotification />
                    </button>
                </div>
            </div>
        </WebinarContentContext.Provider>
    );
};

const mapState = state => ({
    auth: state.auth,
    settings: state.settings,
    chat: state.chat,
});

const mapDispatch = dispatch => ({
    getConfiguration: payload =>
        dispatch.settings.getConfigurationAsync(payload),
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
