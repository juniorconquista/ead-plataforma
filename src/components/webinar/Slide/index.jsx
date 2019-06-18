import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PDF from 'react-pdf-js';

import './style.scss';

const Slide = ({ getSlide, getFiles, slide }) => {
    const [page, setPage] = useState(0);
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
        // this.setState({ page: this.state.page - 1 });
    };

    const handleNext = () => {
        // this.setState({ page: this.state.page + 1 });
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

export default connect(
    mapState,
    mapDispatch,
)(memo(Slide));

// class TEST extends Component {
//     state = {};
//     handlePrevious = this.handlePrevious.bind(this);
//     handleNext = this.handleNext.bind(this);
//     onDocumentComplete = this.onDocumentComplete.bind(this);

//     onDocumentComplete(pages) {
//         console.log(pages);
//         this.setState({ page: 1, pages });
//     }

//     handlePrevious() {
//         this.setState({ page: this.state.page - 1 });
//     }

//     handleNext() {
//         this.setState({ page: this.state.page + 1 });
//     }

//     renderPagination() {
//         return (
//             <>
//                 <button onClick={this.handlePrevious}>&lt;</button>
//                 <button onClick={this.handleNext}>&gt;</button>
//             </>
//         );
//     }

//     render() {
//         let pagination = null;

//         if (this.state.pages) {
//             pagination = this.renderPagination();
//         }
//         return (
//             <div className="slide">
//                 <PDF
//                     file="sample.pdf"
//                     page={this.state.page}
//                     onDocumentComplete={this.onDocumentComplete}
//                 />
//                 {pagination}
//             </div>
//         );
//     }
// }

// import React, { useState, useEffect, useRef, memo } from 'react';
// import { usePdf } from 'react-pdf-js';

// import { WebinarContentContext } from '../../../containers/Webinar';
// // import TEST from '../../../assets/files/test.pdf'

// import './style.scss';

// const Slide = () => {
//     const [page, setPage] = useState(1);
//     const [pages, setPages] = useState(null);

//     const renderPagination = (page, pages) => {
//         if (!pages) {
//             return null;
//         }
//         let previousButton = (
//             <li className="previous" onClick={() => setPage(page - 1)}>
//                 <a href="#">
//                     <i className="fa fa-arrow-left" /> Previous
//                 </a>
//             </li>
//         );
//         if (page === 1) {
//             previousButton = (
//                 <li className="previous disabled">
//                     <a href="#">
//                         <i className="fa fa-arrow-left" /> Previous
//                     </a>
//                 </li>
//             );
//         }
//         let nextButton = (
//             <li className="next" onClick={() => setPage(page + 1)}>
//                 <a href="#">
//                     Next <i className="fa fa-arrow-right" />
//                 </a>
//             </li>
//         );
//         if (page === pages) {
//             nextButton = (
//                 <li className="next disabled">
//                     <a href="#">
//                         Next <i className="fa fa-arrow-right" />
//                     </a>
//                 </li>
//             );
//         }
//         return (
//             <nav>
//                 <ul className="pager">
//                     {previousButton}
//                     {nextButton}
//                 </ul>
//             </nav>
//         );
//     };

//     const canvasEl = useRef(null);

//     const [loading, numPages] = usePdf({
//         file: 'test.pdf',
//         page,
//         canvasEl,
//     });

//     useEffect(() => {
//         setPages(numPages);
//     }, [numPages]);

//     return (
//         <div>
//             {loading && <span>Loading...</span>}
//             <canvas ref={canvasEl} />
//             {renderPagination(page, pages)}
//         </div>
//     );
// };

// export default memo(Slide);
