import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ErrorForm from '../../components/shared/ErrorForm';
import Education from '../../assets/icons/education.svg';
import './style.scss';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-MAIL inválido')
        .required('Favor informar o seu E-MAIL'),
    password: Yup.string().required('Favor informar a sua SENHA'),
});

const Login = memo(props => {
    const { login } = props;
    return (
        <div className="login-page">
            <div className="login-page__form">
                <div className="form__logo">
                    <img src={Education} alt="education" />
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values =>
                        login(values).then(() => {
                            const {
                                history: { push },
                            } = props;
                            push('/webinar');
                        })
                    }
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                type="text"
                                name="email"
                                render={({ field }) => (
                                    <TextField
                                        id="outlined-email"
                                        label="E-mail"
                                        margin="normal"
                                        autoComplete="current-email"
                                        variant="outlined"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && touched.email ? (
                                <ErrorForm message={errors.email} />
                            ) : null}
                            <Field
                                type="text"
                                name="password"
                                render={({ field }) => (
                                    <TextField
                                        autoComplete="current-password"
                                        id="outlined-password-input"
                                        label="Senha"
                                        type="password"
                                        margin="normal"
                                        variant="outlined"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.senha && touched.senha ? (
                                <ErrorForm message={errors.senha} />
                            ) : null}
                            <div className="form__button">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
});

const mapState = state => ({
    loading: state.loading.effects.auth.login,
});

const mapDispatch = dispatch => ({
    login: payload => dispatch.auth.loginAsync(payload),
});

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    )(Login),
);
