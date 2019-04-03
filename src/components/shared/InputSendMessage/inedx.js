import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Picker } from 'emoji-mart';
import './style.scss';

const propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSelectedEmoji: PropTypes.func.isRequired,
    handleEmoji: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    toggleEmoji: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool,
    emojiPicker: PropTypes.bool,
};

const defaultProps = {
    isInvalid: undefined,
    emojiPicker: undefined,
};

const InputSendMessage = React.forwardRef((props, ref) => {
    const {
        placeholder,
        handleChange,
        handleSelectedEmoji,
        handleEmoji,
        value,
        isInvalid,
        emojiPicker,
        toggleEmoji,
    } = props;

    const classesGroup = classnames({
        'input-group-prepend': true,
        'input-group-emoji': emojiPicker,
    });
    const classesInput = classnames({
        'form-control': true,
        'emoji-picker': emojiPicker,
        'is-invalid': isInvalid,
    });
    const classesIcon = classnames({
        'input-group-text': true,
        'is-invalid': isInvalid,
    });

    return (
        <div className="input-group input-group-lg">
            <div className={classesGroup}>
                {emojiPicker && (
                    <>
                        <div className={classesIcon}>
                            <button
                                onClick={handleEmoji}
                                type="button"
                                className="svg-icon-base sm icon-smile"
                                data-testid="list-emoji"
                            />
                        </div>
                        <div ref={ref}>
                            {toggleEmoji && (
                                <>
                                    <div
                                        className="overlay"
                                        role="presentation"
                                        onClick={handleEmoji}
                                    />
                                    <Picker
                                        onSelect={handleSelectedEmoji}
                                        showPreview={false}
                                        perLine={6}
                                    />
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <input
                id="send-message"
                name="send-message"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={classesInput}
            />
            <div className="input-group-prepend">
                <div className={classesIcon}>
                    <button
                        type="submit"
                        className="svg-icon-base sm icon-send-message"
                        data-testid="button-send-message"
                    />
                </div>
            </div>
        </div>
    );
});

InputSendMessage.propTypes = propTypes;
InputSendMessage.defaultProps = defaultProps;

export default InputSendMessage;
