'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedSection - Triggers animations when element enters viewport
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.animation - Animation class to apply (default: 'animate-fadeInUp')
 * @param {number} props.delay - Animation delay in ms (default: 0)
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.threshold - Intersection observer threshold (default: 0.1)
 */
export default function AnimatedSection({
    children,
    animation = 'animate-fadeInUp',
    delay = 0,
    className = '',
    threshold = 0.1,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can unobserve
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: '50px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={`${isVisible ? animation : 'opacity-0'} ${className}`}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards',
            }}
        >
            {children}
        </div>
    );
}
