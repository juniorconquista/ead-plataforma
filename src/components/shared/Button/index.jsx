import React, { memo } from 'react';

import './style.scss';

const Button = props => {
    const { text, style, ...rest } = props;
    return (
        <button {...rest} className="base-button" style={style}>
            {text}
        </button>
    );
};

export default memo(Button);
