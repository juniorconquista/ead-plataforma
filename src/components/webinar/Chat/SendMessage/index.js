import React, { memo } from 'react';
import InputSendMessage from '../InputSendMessage';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const chatSchema = Yup.object().shape({
    text: Yup.string().required(),
});

const Message = ({ sendMessage, userId, name }) => {
    return (
        <div className="chat-page__send-message">
            <div className="send-messages">
                <Formik
                    initialValues={{ text: '' }}
                    validationSchema={chatSchema}
                    onSubmit={(values, { resetForm }) => {
                        sendMessage({
                            ...values,
                            nameSender: name,
                            idSender: userId,
                        });
                        resetForm();
                    }}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <Field
                                type="text"
                                name="text"
                                placeholder="Digite sua mensagem"
                                render={({ field }) => (
                                    <InputSendMessage
                                        field={field}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                    />
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default memo(Message);
