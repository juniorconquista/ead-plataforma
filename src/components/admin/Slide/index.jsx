import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PDF from 'react-pdf-js';

import { ReactComponent as IconLeft } from '../../../assets/icons/esquerda.svg';
import { ReactComponent as IconRight } from '../../../assets/icons/direita.svg';

import Button from '../../shared/Button';
import slideSocket from '../../../containers/socketIo/Slide';

import './style.scss';

const AdminSlide = ({ getSlide, getFiles, slide, io }) => {
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
            <div className="slide__content">
                <div className="send-slide">
                    <Button type="submit" text="Enviar slide" />
                </div>
                <div className="slide-admin">
                    <button type="button" onClick={handlePrevious}>
                        <IconLeft />
                    </button>
                    <div className="presentation">
                        {!!slide.file.length && (
                            <PDF
                                file={slide.file}
                                page={page}
                                onDocumentComplete={onDocumentComplete}
                            />
                        )}
                    </div>
                    <button type="button" onClick={handleNext}>
                        <IconRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapState = state => ({
    slide: state.slide,
});

const mapDispatch = dispatch => ({
    getSlide: payload => dispatch.slide.getSlideAsync(payload),
    getFiles: payload => dispatch.slide.getFilesAsync(payload),
});

export default compose(
    slideSocket,
    connect(
        mapState,
        mapDispatch,
    ),
)(memo(AdminSlide));
