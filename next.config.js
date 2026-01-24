/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Development - Rails backend Active Storage
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/rails/active_storage/**',
            },
            // Allow 127.0.0.1 explicitly
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/rails/active_storage/**',
            },
            // Allow all HTTPS images (for production use)
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        // Custom loader for development to handle localhost images
        loader: process.env.NODE_ENV === 'development' ? 'custom' : 'default',
        loaderFile: process.env.NODE_ENV === 'development' ? './lib/imageLoader.js' : undefined,
    },
    turbopack: {
        root: import.meta.dirname,
    },
};

export default nextConfig;
