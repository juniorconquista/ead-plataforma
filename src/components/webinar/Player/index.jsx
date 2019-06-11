import React, { memo, useContext } from 'react';
import renderHTML from 'react-render-html';

import { WebinarContentContext } from '../../../containers/Webinar';

import './style.scss';

const Player = () => {
    const { configuration } = useContext(WebinarContentContext);
    return (
        <div className="player">
            {configuration.url && !!configuration.url.length ? (
                renderHTML(configuration.url)
            ) : (
                <div className="info">
                    Aguarde a transmissão vai começar em breve
                </div>
            )}
        </div>
    );
};

export default memo(Player);
