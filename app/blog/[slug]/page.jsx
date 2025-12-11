import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import StructuredData from '@/components/StructuredData';
import { generateArticleSchema } from '@/lib/seo';
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

async function getBlogPost(slug) {
    try {
        const response = await api.blog.getBySlug(slug);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt || post.title,
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            type: 'article',
            publishedTime: post.published_at,
            images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.title,
            images: post.cover_image_url ? [post.cover_image_url] : [],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        return (
            <div className="bg-gray-50 min-h-screen py-16">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
                        <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                            ← Back to Blog
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    const structuredData = generateArticleSchema({
        title: post.title,
        description: post.excerpt,
        image: post.cover_image_url,
        datePublished: post.published_at,
        dateModified: post.updated_at,
    });

    return (
        <>
            <StructuredData data={structuredData} />

            <article className="bg-white">
                {/* Hero Image */}
                {post.cover_image_url && (
                    <div className="relative w-full h-96 bg-gray-200">
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <Container className="py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Blog
                        </Link>

                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center">
                                <FaCalendar className="mr-2" />
                                <span>
                                    {new Date(post.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            {post.author && (
                                <div className="flex items-center">
                                    <FaUser className="mr-2" />
                                    <span>{post.author}</span>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </Container>
            </article>
        </>
    );
}
