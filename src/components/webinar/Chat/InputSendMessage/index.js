import React, { memo, useState } from 'react';
import classnames from 'classnames';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import { ReactComponent as IconSend } from '../../../../assets/icons/icon_send-message.svg';
import { ReactComponent as IconSmile } from '../../../../assets/icons/icon_smile.svg';

import './style.scss';

const InputSendMessage = ({ field, errors, values, setFieldValue }) => {
    const [toggleEmoji, handleEmoji] = useState(false);
    const handleSelectedEmoji = emoji => {
        setFieldValue('text', values.text + emoji.native);
        handleEmoji(false);
    };

    return (
        <div
            className={classnames({
                'input-group': true,
            })}
        >
            <button
                onClick={() => handleEmoji(true)}
                type="button"
                className="btn__send-message"
            >
                <IconSmile />
            </button>
            {toggleEmoji && (
                <>
                    <div
                        className="overlay"
                        role="presentation"
                        onClick={() => handleEmoji(false)}
                    />
                    <Picker
                        onSelect={handleSelectedEmoji}
                        showPreview={false}
                        perLine={6}
                    />
                </>
            )}
            <input
                {...field}
                placeholder="Digite sua mensagem"
                className="input__send-message"
            />
            <button type="submit" className="btn__send-message">
                <IconSend />
            </button>
        </div>
    );
};

export default memo(InputSendMessage);
