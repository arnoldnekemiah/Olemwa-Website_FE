export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/events',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // TODO: Fetch dynamic pages (blog posts, projects, events) from API
    // For now, returning static pages only
    // In production, you'd want to fetch all blog slugs, project IDs, event IDs
    // and include them in the sitemap

    return staticPages;
}
