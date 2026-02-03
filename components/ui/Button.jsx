'use client';

import { useState } from 'react';

export default function Button({ children, variant = 'primary', size = 'default', className = '', ...props }) {
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

    const baseStyles = 'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 inline-flex items-center justify-center';

    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        default: 'px-6 py-3',
        large: 'px-8 py-4 text-lg',
    };

    const variants = {
        primary: 'bg-gold text-black-charcoal hover:shadow-lg hover:shadow-gold/40 hover:-translate-y-0.5',
        secondary: 'bg-black-charcoal text-white border-2 border-gold hover:bg-black-soft hover:shadow-lg',
        outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-black-charcoal',
        ghost: 'text-gold hover:bg-gold/10',
        gradient: 'bg-gold-gradient text-black-charcoal hover:shadow-lg hover:shadow-gold/40 hover:-translate-y-0.5',
        white: 'bg-white text-black-charcoal hover:bg-gray-100 shadow-md hover:shadow-lg',
    };

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
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
