import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PDF from 'react-pdf-js';

import { ReactComponent as IconLeft } from '../../../assets/icons/esquerda.svg';
import { ReactComponent as IconRight } from '../../../assets/icons/direita.svg';

import Button from '../../shared/Button';
import ErrorForm from '../../shared/ErrorForm';
import slideSocket from '../../../containers/socketIo/Slide';

import './style.scss';

const SlideSchema = Yup.object().shape({
    slide: Yup.mixed().required('Favor informar o Slide'),
});

const AdminSlide = ({ getSlide, getFiles, sendSlide, slide, io }) => {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSlide();
    }, []);

    useEffect(() => {
        if (!!slide.path.length) {
            getFiles(slide.path);
        }
    }, [slide.path]);

    const onDocumentComplete = pages => {
        setPage(1);
        setTotal(pages);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevState => prevState - 1);
            io.emit('slide|previous', page - 1);
        }
    };

    const handleNext = () => {
        if (page < total) {
            setPage(prevState => prevState + 1);
            io.emit('slide|next', page + 1);
        }
    };

    return (
        <div className="slide__content-admin">
            <h1>Gerenciar slide</h1>
            <Formik
                validationSchema={SlideSchema}
                initialValues={{ slide: null }}
                onSubmit={values =>
                    sendSlide(values)
                        .then(() =>
                            toast.success('Arquivo enviado com sucesso !'),
                        )
                        .catch(err => err)
                }
                render={({
                    values,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched,
                }) => {
                    return (
                        <div className="slide__content">
                            <form onSubmit={handleSubmit}>
                                <div className="send-slide">
                                    <div className="upload-btn-wrapper">
                                        <button class="btn">
                                            {values.slide
                                                ? values.slide.name
                                                : 'Upload do arquivo'}
                                        </button>
                                        <input
                                            id="file"
                                            name="slide"
                                            type="file"
                                            onChange={event => {
                                                setFieldValue(
                                                    'slide',
                                                    event.currentTarget
                                                        .files[0],
                                                );
                                            }}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="slide-admin">
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                    >
                                        <IconLeft />
                                    </button>
                                    <div className="presentation">
                                        {!!slide.file.length && (
                                            <PDF
                                                file={slide.file}
                                                page={page}
                                                onDocumentComplete={
                                                    onDocumentComplete
                                                }
                                            />
                                        )}
                                    </div>
                                    <button type="button" onClick={handleNext}>
                                        <IconRight />
                                    </button>
                                </div>
                                <div className="action-slide">
                                    <Button type="submit" text="Enviar slide" />
                                    {errors.slide && touched.slide ? (
                                        <ErrorForm message={errors.slide} />
                                    ) : null}
                                </div>
                            </form>
                        </div>
                    );
                }}
            />
        </div>
    );
};

const mapState = state => ({
    slide: state.slide,
});

const mapDispatch = dispatch => ({
    getSlide: payload => dispatch.slide.getSlideAsync(payload),
    getFiles: payload => dispatch.slide.getFilesAsync(payload),
    sendSlide: payload => dispatch.slide.sendSlideAsync(payload),
});

export default compose(
    slideSocket,
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(AdminSlide));
