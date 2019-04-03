import React, { memo } from 'react';
import InputSendMessage from '../../../shared/InputSendMessage';

import './style.scss';

const Message = props => {
    const { message, userId } = props;
    return (
        <div className="chat-page__send-message">
            <div className="send-messages">
                <form>
                    <InputSendMessage
                        placeholder="Enviar Mensagem"
                        // handleChange={this.handleChange}
                        // handleSelectedEmoji={this.handleSelectedEmoji}
                        // handleEmoji={this.handleEmoji}
                        value={message}
                        isInvalid={isInvalid}
                        toggleEmoji={toggleEmoji}
                        emojiPicker
                    />
                </form>
            </div>
        </div>
    );
};

export default memo(Message);
