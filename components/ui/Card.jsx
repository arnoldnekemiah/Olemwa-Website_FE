export default function Card({ children, className = '', hover = false, premium = false }) {
    const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300';
    const hoverClasses = hover
        ? 'hover:shadow-2xl hover:scale-105 hover:border-gold cursor-pointer'
        : '';
    const premiumClasses = premium
        ? 'border-2 border-gold relative before:absolute before:inset-0 before:animate-shimmer'
        : '';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${premiumClasses} ${className}`}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

export function CardBody({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
            {children}
        </div>
    );
}
