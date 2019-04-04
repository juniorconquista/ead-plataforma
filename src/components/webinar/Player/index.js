import React, { memo } from 'react';

import './style.scss';

const Player = () => (
    <div className="player">
        <div className="info">Aguarde a transmissão vai começar em breve</div>
    </div>
);

export default memo(Player);
