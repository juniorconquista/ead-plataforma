import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as IconUser } from '../../assets/icons/user.svg';
import { ReactComponent as IconPassword } from '../../assets/icons/password.svg';

import Loading from '../../components/shared/Loading';
import ErrorForm from '../../components/shared/ErrorForm';
import InputGroup from '../../components/shared/InputGroup';
import Button from '../../components/shared/Button';

import LOGO from '../../assets/icons/logo.svg';
import './style.scss';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-MAIL inválido')
        .required('Favor informar o seu E-MAIL'),
    password: Yup.string().required('Favor informar a sua SENHA'),
});

const Login = ({ login, loading, history: { push } }) => (
    <>
        <div className="login-page">
            <div className="login-page__form">
                <div className="form__logo">
                    <img src={LOGO} alt="education" />
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values =>
                        login(values)
                            .then(() => push('/webinar'))
                            .catch(err => err)
                    }
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                type="text"
                                name="email"
                                render={({ field }) => (
                                    <InputGroup
                                        {...field}
                                        Icon={IconUser}
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

                            <div className="form__info">
                                Esqueci minha senha
                            </div>
                            <div className="form__button">
                                <Button type="submit" text="Login" />
                                <Link to="/register">Cadastre-se</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        {loading && <Loading />}
    </>
);

const mapState = state => ({
    loading: state.loading.effects.auth.loginAsync,
});

const mapDispatch = dispatch => ({
    login: payload => dispatch.auth.loginAsync(payload),
});

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    )(memo(Login)),
);
