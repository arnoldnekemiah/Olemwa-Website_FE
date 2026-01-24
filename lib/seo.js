// Generate metadata for pages
export function generateMetadata({ title, description, image, url }) {
    const siteName = 'Olemwa Sports Club CMS';
    const defaultDescription = 'Official website of the Olemwa Sports Club';

    return {
        title: title ? `${title} | ${siteName}` : siteName,
        description: description || defaultDescription,
        openGraph: {
            title: title || siteName,
            description: description || defaultDescription,
            url: url,
            siteName: siteName,
            images: image ? [{ url: image }] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title || siteName,
            description: description || defaultDescription,
            images: image ? [image] : [],
        },
    };
}

// Generate JSON-LD structured data for Organization
export function generateOrganizationSchema({ name, url, logo, description }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: name || 'Olemwa Sports Club',
        url: url || 'http://localhost:3000',
        logo: logo,
        description: description,
    };
}

// Generate JSON-LD structured data for Article (blog posts)
export function generateArticleSchema({ title, description, image, datePublished, dateModified, author }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Person',
            name: author || 'Olemwa Sports Club',
        },
    };
}

// Generate JSON-LD structured data for Event
export function generateEventSchema({ name, description, startDate, endDate, location, image }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        location: {
            '@type': 'Place',
            name: location,
        },
        image: image,
    };
}
