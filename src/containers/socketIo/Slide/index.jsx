import React, { PureComponent } from 'react';
import { compose } from 'recompose';

import { findOrCreate } from '../../../utils/sockets';
import { BASE_URL } from '../../../utils/constants';

const slideSocketIo = Component =>
    class slideSocketIo extends PureComponent {
        registerOnPrevious = () => {
            const event = 'slide|previous|page';
            this.socket.off(event);
            this.socket.on(event, page => this.onPreviousCallback(page));
        };

        onPrevious = callback => {
            this.onPreviousCallback = callback;
        };

        registerOnNext = () => {
            const event = 'slide|next|page';
            this.socket.off(event);
            this.socket.on(event, page => this.onNextCallback(page));
        };

        onNext = callback => {
            this.onNextCallback = callback;
        };

        render() {
            this.socket = findOrCreate(BASE_URL);
            const { props } = this;
            return (
                <Component
                    io={this.socket}
                    onPrevious={this.onPrevious}
                    registerOnPrevious={this.registerOnPrevious}
                    onNext={this.onNext}
                    registerOnNext={this.registerOnNext}
                    {...props}
                />
            );
        }
    };

export default compose(slideSocketIo);
