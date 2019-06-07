import React, { memo, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as IconSend } from '../../../assets/icons/send.svg';
import './style.scss';

import { WebinarContentContext } from '../../../containers/Webinar';

const chatSchema = Yup.object().shape({
    text: Yup.string().required(),
});

const InputSendMessage = ({ sendMessage, userId, name }) => {
    const { configuration } = useContext(WebinarContentContext);
    return (
        <Formik
            initialValues={{ text: '' }}
            validationSchema={chatSchema}
            onSubmit={(values, { resetForm }) => {
                sendMessage({
                    ...values,
                    nameSender: name,
                    idSender: userId,
                    status: configuration.moderateChat ? 'waiting' : 'approved',
                });
                resetForm();
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <Field
                        type="text"
                        name="text"
                        placeholder="Compartilhe suas idéias"
                        render={({ field }) => (
                            <div className="input-send-message">
                                <input
                                    {...field}
                                    placeholder="Compartilhe suas idéias"
                                />
                                <button type="submit" className="icon">
                                    <IconSend />
                                </button>
                            </div>
                        )}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default memo(InputSendMessage);

// const Message = ({ sendMessage, userId, name }) => {
//     const { configuration } = useContext(WebinarContentContext);
//     return (
//         <div className="chat-page__send-message">
//             <div className="send-messages">
//                 <Formik
//                     initialValues={{ text: '' }}
//                     validationSchema={chatSchema}
//                     onSubmit={(values, { resetForm }) => {
//                         sendMessage({
//                             ...values,
//                             nameSender: name,
//                             idSender: userId,
//                             status: configuration.moderateChat
//                                 ? 'waiting'
//                                 : 'approved',
//                         });
//                         resetForm();
//                     }}
//                 >
//                     {({ errors, values, setFieldValue }) => (
//                         <Form>
//                             <Field
//                                 type="text"
//                                 name="text"
//                                 placeholder="Digite sua mensagem"
//                                 render={({ field }) => (
//                                     <InputSendMessage
//                                         field={field}
//                                         setFieldValue={setFieldValue}
//                                         values={values}
//                                     />
//                                 )}
//                             />
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default memo(Message);
