import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PDF from 'react-pdf-js';

import slideSocket from '../../../containers/socketIo/Slide';
import './style.scss';

const Slide = ({
    getSlide,
    getFiles,
    slide,
    onPrevious,
    registerOnPrevious,
    onNext,
    registerOnNext,
}) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        getSlide();
    }, []);

    useEffect(() => {
        if (!!slide.path.length) {
            getFiles(slide.path);
            onPrevious(handlePrevious);
            registerOnPrevious();
            onNext(handleNext);
            registerOnNext();
        }
    }, [slide.path]);

    const onDocumentComplete = pages => {
        setPage(1);
    };

    const handlePrevious = page => {
        setPage(page);
    };

    const handleNext = page => {
        setPage(page);
    };

    return (
        <div className="slide">
            {!!slide.file.length && (
                <PDF
                    file={slide.file}
                    page={page}
                    onDocumentComplete={onDocumentComplete}
                />
            )}
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
)(memo(Slide));
