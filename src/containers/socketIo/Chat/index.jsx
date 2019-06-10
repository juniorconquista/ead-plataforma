import React, { PureComponent } from 'react';
import { compose } from 'recompose';

import { findOrCreate } from '../../../utils/sockets';
import { BASE_URL } from '../../../utils/constants';

const chatSocketIo = Component =>
    class chatSocketIo extends PureComponent {
        registerOnCount = () => {
            const event = 'chat|count|users';
            this.socket.off(event);
            this.socket.on(event, count => this.onCountCallback(count));
        };

        onCount = callback => {
            this.onCountCallback = callback;
        };

        registerOnMessageReceive = () => {
            const event = 'chat|message|receive';
            this.socket.off(event);
            this.socket.on(event, response =>
                this.onMessageReceiveCallback(response),
            );
        };

        onMessageReceive = callback => {
            this.onMessageReceiveCallback = callback;
        };

        registerOnMessageUpdateReceive = () => {
            const event = 'chat|message|update';
            this.socket.off(event);
            this.socket.on(event, response =>
                this.onMessageReceiveUpdateCallback(response),
            );
        };

        onMessageUpdateReceive = callback => {
            this.onMessageReceiveUpdateCallback = callback;
        };

        render() {
            this.socket = findOrCreate(BASE_URL);
            const { props } = this;
            return (
                <Component
                    onMessageReceive={this.onMessageReceive}
                    registerOnMessageReceive={this.registerOnMessageReceive}
                    onMessageUpdateReceive={this.onMessageUpdateReceive}
                    registerOnMessageUpdateReceive={this.registerOnMessageUpdateReceive}
                    onCount={this.onCount}
                    registerOnCount={this.registerOnCount}
                    {...props}
                />
            );
        }
    };

export default compose(chatSocketIo);
