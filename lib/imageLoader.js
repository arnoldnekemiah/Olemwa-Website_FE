// Custom image loader for development to handle localhost Active Storage URLs
export default function imageLoader({ src, width, quality }) {
    // If it's already a full URL (like from Active Storage), return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
        return src;
    }

    // For local static files in public folder
    return src;
}
