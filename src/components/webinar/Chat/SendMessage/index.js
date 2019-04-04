import React, { memo } from 'react';
import InputSendMessage from '../InputSendMessage';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const chatSchema = Yup.object().shape({
    message: Yup.string().required(),
});

const Message = () => {
    return (
        <div className="chat-page__send-message">
            <div className="send-messages">
                <Formik
                    initialValues={{ message: '' }}
                    validationSchema={chatSchema}
                    onSubmit={values => console.log(values)}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <Field
                                type="text"
                                name="message"
                                placeholder="Digite sua mensagem"
                                render={({ field }) => (
                                    <InputSendMessage
                                        field={field}
                                        errors={errors}
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
