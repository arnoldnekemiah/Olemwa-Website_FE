export default function LoadingSpinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`${sizes[size]} border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}
            ></div>
        </div>
    );
}
