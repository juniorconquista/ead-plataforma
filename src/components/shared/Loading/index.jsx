import React, { memo } from 'react';
import { connect } from 'react-redux';

import './style.scss';

const Loading = ({ loading }) =>
    loading && (
        <div className="loading">
            <div class="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );

const mapState = state => ({
    loading:
        state.loading.effects.auth.loginAsync ||
        state.loading.effects.auth.registerAsync ||
        state.loading.effects.settings.setConfigurationAsync ||
        state.loading.effects.slide.sendSlideAsync || state.loading.effects.status.getUsersAsync,
});

export default connect(mapState)(memo(Loading));
