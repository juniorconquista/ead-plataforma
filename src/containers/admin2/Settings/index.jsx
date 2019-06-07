import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ErrorForm from '../../../components/shared/ErrorForm';

const SettingsSchema = Yup.object().shape({
    url: Yup.string().required('Favor informar o seu E-MAIL'),
    date: Yup.string().required('Favor informar a sua SENHA'),
});

const Settings = ({ getConfiguration }) => {
    useEffect(() => {
        getConfiguration();
    }, []);

    return (
        <div>
            <Formik
                initialValues={{
                    url: '',
                    date: '',
                    inscriptionsClosed: false,
                    moderateChat: true,
                }}
                validationSchema={SettingsSchema}
                onSubmit={values => console.log(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            type="text"
                            name="url"
                            render={({ field }) => (
                                <TextField
                                    id="outlined-url"
                                    label="URL"
                                    margin="normal"
                                    autoComplete="current-url"
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />
                        {errors.url && touched.url ? (
                            <ErrorForm message={errors.url} />
                        ) : null}
                        <Field
                            type="text"
                            name="date"
                            render={({ field }) => (
                                <TextField
                                    autoComplete="current-date"
                                    id="outlined-date-input"
                                    label="Senha"
                                    type="date"
                                    margin="normal"
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />
                        {errors.date && touched.date ? (
                            <ErrorForm message={errors.date} />
                        ) : null}
                        <FormControlLabel
                            value={true}
                            checked={true}
                            control={
                                <Checkbox name="moderateChat" color="primary" />
                            }
                            label="Moderar chat"
                        />
                        <FormControlLabel
                            value={false}
                            checked={false}
                            control={
                                <Checkbox
                                    name="inscriptionsClosed"
                                    color="primary"
                                />
                            }
                            label="Encerrar inscrições"
                        />
                        <div className="form__button">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Salvar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapState = state => ({
    settings: state.settings,
});

const mapDispatch = dispatch => ({
    getConfiguration: payload =>
        dispatch.settings.getConfigurationAsync(payload),
});

export default compose(
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(Settings));
