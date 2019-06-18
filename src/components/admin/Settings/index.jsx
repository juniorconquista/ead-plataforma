import React, { memo, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { ReactComponent as IconWorld } from '../../../assets/icons/mundo.svg';
import { ReactComponent as IconDate } from '../../../assets/icons/data.svg';
import { ReactComponent as IconTitle } from '../../../assets/icons/title.svg';
import { ReactComponent as IconSubtitle } from '../../../assets/icons/subtitle.svg';

import Loading from '../../shared/Loading';
import InputGroup from '../../shared/InputGroup';
import ErrorForm from '../../shared/ErrorForm';
import Button from '../../shared/Button';

import './style.scss';

const SettingsSchema = Yup.object().shape({
    url: Yup.string().required('Favor informar a URL da transmissão'),
    date: Yup.string().required('Favor informar a data SENHA da transmissão'),
    title: Yup.string().required('Favor informar o TÍTULO da transmissão'),
    description: Yup.string().required(
        'Favor informar o DESCRIÇÃO da transmissão',
    ),
});

const Settings = ({
    getConfiguration,
    setConfiguration,
    loading,
    settings: { configuration },
}) => {
    useEffect(() => {
        getConfiguration();
    }, []);

    return (
        <>
            <div className="settings__content-admin">
                <h1>Configurações gerais</h1>
                <Formik
                    initialValues={{
                        ...configuration,
                        date: configuration.date
                            ? moment(configuration.date).format(
                                  'DD/MM/YYYY HH:mm',
                              )
                            : undefined,
                    }}
                    validationSchema={SettingsSchema}
                    onSubmit={values =>
                        setConfiguration(values)
                            .then(() => {
                                toast.success(
                                    'Configurações salvas com sucesso !',
                                );
                            })
                            .catch(err => err)
                    }
                    enableReinitialize
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <div className="form-box">
                                <div className="group">
                                    <Field
                                        type="text"
                                        name="url"
                                        render={({ field }) => (
                                            <InputGroup
                                                {...field}
                                                Icon={IconWorld}
                                                autoComplete="current-url"
                                                placeholder="URL"
                                            />
                                        )}
                                    />
                                    {errors.url && touched.url ? (
                                        <ErrorForm message={errors.url} />
                                    ) : null}
                                </div>
                                <div className="group">
                                    <Field
                                        type="text"
                                        name="date"
                                        render={({ field }) => (
                                            <InputGroup
                                                {...field}
                                                Icon={IconDate}
                                                autoComplete="current-date"
                                                placeholder="Data"
                                            />
                                        )}
                                    />
                                    {errors.date && touched.date ? (
                                        <ErrorForm message={errors.date} />
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-box">
                                <div className="group">
                                    <Field
                                        type="text"
                                        name="title"
                                        render={({ field }) => (
                                            <InputGroup
                                                {...field}
                                                Icon={IconTitle}
                                                autoComplete="current-title"
                                                placeholder="Título"
                                            />
                                        )}
                                    />
                                    {errors.title && touched.title ? (
                                        <ErrorForm message={errors.title} />
                                    ) : null}
                                </div>
                                <div className="group">
                                    <Field
                                        type="text"
                                        name="description"
                                        render={({ field }) => (
                                            <InputGroup
                                                {...field}
                                                Icon={IconSubtitle}
                                                autoComplete="current-description"
                                                placeholder="Descrição"
                                            />
                                        )}
                                    />
                                    {errors.description &&
                                    touched.description ? (
                                        <ErrorForm
                                            message={errors.description}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className="form__checkbox">
                                <Field
                                    name="moderateChat"
                                    render={({ field }) => (
                                        <div className="custon-checkbox">
                                            <input
                                                {...field}
                                                id="moderateChat"
                                                type="checkbox"
                                                checked={values.moderateChat}
                                                onChange={evt =>
                                                    setFieldValue(
                                                        'moderateChat',
                                                        evt.target.checked,
                                                    )
                                                }
                                            />
                                            <label htmlFor="moderateChat">
                                                Moderar chat
                                            </label>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="inscriptionsClosed"
                                    render={({ field }) => (
                                        <div className="custon-checkbox">
                                            <input
                                                {...field}
                                                type="checkbox"
                                                id="inscriptionsClosed"
                                                checked={
                                                    values.inscriptionsClosed
                                                }
                                                onChange={evt =>
                                                    setFieldValue(
                                                        'inscriptionsClosed',
                                                        evt.target.checked,
                                                    )
                                                }
                                            />
                                            <label htmlFor="inscriptionsClosed">
                                                Encerrar inscrições
                                            </label>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="form__button">
                                <Button type="submit" text="Salvar" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {loading && <Loading />}
        </>
    );
};

const mapState = state => ({
    settings: state.settings,
});

const mapDispatch = dispatch => ({
    getConfiguration: payload =>
        dispatch.settings.getConfigurationAsync(payload),
    setConfiguration: payload =>
        dispatch.settings.setConfigurationAsync(payload),
});

export default compose(
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(Settings));
