export default function Card({ children, className = '', hover = false, premium = false, bordered = false, dark = false }) {
    const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
    const bgClasses = dark ? 'bg-black-soft' : 'bg-white';
    const shadowClasses = 'shadow-md';
    const hoverClasses = hover
        ? 'hover:shadow-2xl hover:-translate-y-2 hover:border-gold cursor-pointer'
        : '';
    const premiumClasses = premium
        ? 'border-2 border-gold relative before:absolute before:inset-0 before:animate-shimmer'
        : '';
    const borderedClasses = bordered
        ? 'border border-gray-200'
        : '';

    return (
        <div
            className={`${baseClasses} ${bgClasses} ${shadowClasses} ${hoverClasses} ${premiumClasses} ${borderedClasses} ${className}`}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', gradient = false }) {
    const baseClasses = 'px-6 py-4';
    const gradientClasses = gradient
        ? 'bg-gradient-to-r from-gray-50 to-white'
        : 'border-b border-gray-200';

    return (
        <div className={`${baseClasses} ${gradientClasses} ${className}`}>
            {children}
        </div>
    );
}

export function CardBody({ children, className = '' }) {
    return (
        <div className={`px-6 py-5 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '', gradient = false }) {
    const baseClasses = 'px-6 py-4';
    const gradientClasses = gradient
        ? 'bg-gradient-to-r from-gray-50 to-white'
        : 'border-t border-gray-200';

    return (
        <div className={`${baseClasses} ${gradientClasses} ${className}`}>
            {children}
        </div>
    );
}

export function CardImage({ src, alt, className = '' }) {
    return (
        <div className={`relative w-full h-48 overflow-hidden ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
        </div>
    );
}
