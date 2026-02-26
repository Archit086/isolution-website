import React from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const AnimatedCounter = ({ target, isVisible = true }) => {
    const count = useAnimatedCounter(target, 1200, isVisible);
    return <span>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;
