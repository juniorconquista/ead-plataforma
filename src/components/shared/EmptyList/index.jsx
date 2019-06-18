import React, { memo } from 'react';

import './style.scss';

const EmptyList = ({ Icon, info }) => (
    <div className="empty">
        <Icon />
        <h3>{info}</h3>
    </div>
);

export default memo(EmptyList);
