import React, { memo } from 'react';

import './style.scss';

const InputGroup = props => {
    const { Icon, ...rest } = props;
    return (
        <div className="input-group">
            <div className="icon">
                <Icon />
            </div>
            <input {...rest} />
        </div>
    );
};

export default memo(InputGroup);
