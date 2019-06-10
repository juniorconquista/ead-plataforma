import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ErrorForm = ({ message }) => (
    <div className="error-message">{message}</div>
);

ErrorForm.propTypes = {
    message: PropTypes.string.isRequired,
};

export default memo(ErrorForm);
