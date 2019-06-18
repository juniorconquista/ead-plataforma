import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as IconUser } from '../../assets/icons/user.svg';
import { ReactComponent as IconPassword } from '../../assets/icons/password.svg';
import { ReactComponent as IconEmail } from '../../assets/icons/send.svg';

import ErrorForm from '../../components/shared/ErrorForm';
import InputGroup from '../../components/shared/InputGroup';
import Button from '../../components/shared/Button';

import LOGO from '../../assets/icons/logo.svg';
import { uuidv4 } from '../../utils/constants';

import './style.scss';

const RergisterSchema = Yup.object().shape({
    name: Yup.string().required('Favor inválido o sue NOME'),
    email: Yup.string()
        .email('E-MAIL inválido')
        .required('Favor informar o seu E-MAIL'),
    password: Yup.string().required('Favor informar a sua SENHA'),
    confirmPassword: Yup.string()
        .required('Favor confirmar a sua SENHA')
        .oneOf(
            [Yup.ref('password'), null],
            'Os campos SENHA e CONFIRMAÇÃO DE SENHA devem ser iguais',
        ),
});

const Register = ({ register, history: { push } }) => (
    <>
        <div className="register-page">
            <div className="register-page__form">
                <div className="form__logo">
                    <img src={LOGO} alt="education" />
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={RergisterSchema}
                    onSubmit={values =>
                        register({ ...values, uuid: uuidv4() })
                            .then(() => {
                                toast.success(
                                    'Cadastro realizado com sucesso !',
                                );
                                push('/webinar');
                            })
                            .catch(err => err)
                    }
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                type="text"
                                name="name"
                                render={({ field }) => (
                                    <InputGroup
                                        {...field}
                                        Icon={IconUser}
                                        autoComplete="current-name"
                                        placeholder="Nome"
                                    />
                                )}
                            />
                            {errors.name && touched.name ? (
                                <ErrorForm message={errors.name} />
                            ) : null}
                            <Field
                                type="text"
                                name="email"
                                render={({ field }) => (
                                    <InputGroup
                                        {...field}
                                        Icon={IconEmail}
                                        autoComplete="current-email"
                                        placeholder="E-mail"
                                    />
                                )}
                            />
                            {errors.email && touched.email ? (
                                <ErrorForm message={errors.email} />
                            ) : null}
                            <Field
                                type="password"
                                name="password"
                                render={({ field }) => (
                                    <InputGroup
                                        {...field}
                                        Icon={IconPassword}
                                        autoComplete="current-password"
                                        type="password"
                                        placeholder="Senha"
                                    />
                                )}
                            />
                            {errors.password && touched.password ? (
                                <ErrorForm message={errors.password} />
                            ) : null}
                            <Field
                                type="password"
                                name="confirmPassword"
                                render={({ field }) => (
                                    <InputGroup
                                        {...field}
                                        Icon={IconPassword}
                                        autoComplete="current-password-confirmation"
                                        type="password"
                                        placeholder="Redigite a senha"
                                    />
                                )}
                            />
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                                <ErrorForm message={errors.confirmPassword} />
                            ) : null}
                            <div className="form__button">
                                <Button type="submit" text="Cadastre-se" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </>
);

const mapDispatch = dispatch => ({
    register: payload => dispatch.auth.registerAsync(payload),
});

export default withRouter(connect(mapDispatch)(memo(Register)));
