import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTransition } from 'react-spring';

const ListTransitionChain = ({ children, items, interval, keyExtractor }) => {
    const transitions = useTransition(
        items,
        item => (keyExtractor ? item[keyExtractor] : item),
        {
            trail: interval,
            unique: true,
            delay: 1000,
            from: { opacity: 0, transform: 'scale(0)' },
            enter: { opacity: 1, transform: 'scale(1)' },
            leave: { opacity: 0, transform: 'scale(0)' },
        },
    );

    return children(transitions);
};

ListTransitionChain.defaultProps = {
    interval: 250,
};

ListTransitionChain.propTypes = {
    children: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    interval: PropTypes.number,
};

export default memo(ListTransitionChain);
