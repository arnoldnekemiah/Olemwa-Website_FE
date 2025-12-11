# Olemwa Chess Club CMS Frontend

A modern, SEO-optimized Next.js frontend for the Olemwa Chess Club CMS, built with the App Router and Tailwind CSS.

## Features

- **Server-Side Rendering (SSR)** - All pages are server-rendered for optimal SEO and performance
- **Responsive Design** - Mobile-first approach with beautiful UI components
- **SEO Optimized** - Dynamic metadata, Open Graph tags, JSON-LD structured data
- **Blog System** - Markdown support with rich text rendering
- **Projects Showcase** - Display ongoing and completed projects
- **Events Management** - List and detail views for upcoming events
- **Contact Form** - Integrated contact form with backend API
- **Leadership Profiles** - Showcase your team members

## Tech Stack

- **Next.js 14+** with App Router
- **React 18+**
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Markdown** for blog post rendering
- **React Icons** for UI icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Running backend API (Olemwa Chess Club CMS API at `http://localhost:3000`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── about/              # About page
├── blog/               # Blog list and detail pages
│   └── [slug]/        # Dynamic blog post pages
├── contact/            # Contact page
├── events/             # Events list and detail pages
│   └── [id]/          # Dynamic event pages
├── projects/           # Projects list and detail pages
│   └── [id]/          # Dynamic project pages
├── layout.jsx          # Root layout with Header/Footer
├── page.jsx            # Homepage
├── globals.css         # Global styles
├── sitemap.js          # Dynamic sitemap
└── robots.js           # Robots.txt configuration

components/
├── ui/                 # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Container.jsx
│   ├── ErrorMessage.jsx
│   └── LoadingSpinner.jsx
├── Header.jsx          # Site header with navigation
├── Footer.jsx          # Site footer
└── StructuredData.jsx  # JSON-LD component

lib/
├── api.js              # API service layer
└── seo.js              # SEO utilities
```

## API Integration

The frontend consumes the following backend API endpoints:

- `GET /api/about` - About page content
- `GET /api/blog_posts` - Blog posts list
- `GET /api/blog_posts/:slug` - Single blog post
- `GET /api/projects` - Projects list
- `GET /api/projects/:id` - Single project
- `GET /api/leadership_profiles` - Leadership team
- `GET /api/contact` - Contact information
- `POST /api/contact_inquiries` - Submit contact form
- `GET /api/events` - Events list
- `GET /api/events/:id` - Single event

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (required)
- `NEXT_PUBLIC_SITE_URL` - Frontend site URL for SEO (optional)

## SEO Features

- Dynamic metadata for all pages
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data (Organization, Article, Event)
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Image optimization with Next.js Image component

## Development

The application uses:
- **JavaScript** (not TypeScript) for all code
- **Tailwind CSS** for styling
- **App Router** for routing and layouts
- **Server Components** by default for optimal performance

## License

MIT
