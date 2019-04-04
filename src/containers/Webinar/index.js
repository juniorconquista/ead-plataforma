import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Player from '../../components/webinar/Player';
import Chat from '../../components/webinar/Chat';
import './style.scss';

const messages = [
    {
        id: 3,
        sender: 'conquista',
        date: '01/02/2019',
        idSender: 1,
        text:
            'Minha duvida é a respeito da forma como é feito este webinar, pode me ajudar ?',
    },
    {
        id: 2,
        sender: 'admin',
        date: '01/02/2019',
        idSender: 2,
        text: 'Tudo. Qual sua duvida ?',
    },
    {
        id: 1,
        sender: 'conquista',
        date: '01/02/2019',
        idSender: 1,
        text: 'Oi tudo bem ?',
    },
];

export const WebinarContentContext = React.createContext({});

const Webinar = props => {
    const {
        auth: { id: userId },
    } = props;

    return (
        <WebinarContentContext.Provider
            value={{
                messages,
                userId,
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
                        <strong>79</strong> <span>online</span>
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
});

export default withRouter(connect(mapState)(memo(Webinar)));
