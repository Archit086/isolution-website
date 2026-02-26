import { useState, useEffect } from 'react';

// Custom easing function: easeOutCubic
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const useAnimatedCounter = (target, duration = 1200, isStart = true) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isStart) return;

        let startTime = null;
        let rafId = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const timeFraction = Math.min(progress / duration, 1);

            const easedProgress = easeOutCubic(timeFraction);
            const currentCount = Math.floor(easedProgress * target);

            setCount(currentCount);

            if (timeFraction < 1) {
                rafId = requestAnimationFrame(animate);
            } else {
                setCount(target); // Ensure exact target is hit
            }
        };

        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, [target, duration, isStart]);

    return count;
};
