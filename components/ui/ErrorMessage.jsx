import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorMessage({ message, className = '' }) {
    return (
        <div className={`bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-start space-x-3 ${className}`}>
            <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
            <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
}
