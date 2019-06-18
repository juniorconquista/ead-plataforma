import React, { memo } from 'react';
import './style.scss';

const Loading = () => (
    <div className="loading">
        <div class="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);

export default memo(Loading);
