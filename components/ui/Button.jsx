'use client';

import { useState } from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRipple({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            show: true,
        });

        setTimeout(() => setRipple({ ...ripple, show: false }), 600);

        if (props.onClick) {
            props.onClick(e);
        }
    };

    const baseStyles = 'relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

    const variants = {
        primary: 'bg-gold text-black-charcoal hover:shadow-lg hover:shadow-gold/50',
        secondary: 'bg-black-charcoal text-white border-2 border-gold hover:bg-black-soft',
        outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-black-charcoal',
        ghost: 'text-gold hover:bg-gold/10',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}

            {/* Ripple Effect */}
            {ripple.show && (
                <span
                    className="absolute bg-white/30 rounded-full pointer-events-none animate-ping"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: '20px',
                        height: '20px',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
        </button>
    );
}
