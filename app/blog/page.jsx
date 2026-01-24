import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import { FaCalendar } from 'react-icons/fa';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
    title: 'Blog',
    description: 'Read the latest news and updates from our Olemwa Sports Club.',
});

async function getBlogPosts(page = 1) {
    try {
        const response = await api.blog.list(page, 12);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export default async function BlogPage(props) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1');
    const posts = await getBlogPosts(page);

    return (
        <div className="bg-white-warm min-h-screen">
            {/* Hero Section */}
            <section className="bg-black-charcoal text-white py-20 border-b-2 border-gold">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                            Sports Club <span className="text-gold">Blog</span>
                        </h1>
                        <p className="text-xl text-gray-300 animate-fadeInUp delay-200">
                            Latest news, updates, and stories from our sports community
                        </p>
                    </div>
                </Container>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16">
                <Container>
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No blog posts available yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <Link href={`/blog/${post.slug}`} key={post.id}>
                                        <Card hover className="h-full flex flex-col">
                                            {post.cover_image_url && (
                                                <div className="relative h-56 w-full">
                                                    <Image
                                                        src={post.cover_image_url}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <CardBody className="flex-1 flex flex-col">
                                                <h2 className="font-bold text-xl mb-3 line-clamp-2 text-black-charcoal">{post.title}</h2>
                                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                                                <div className="flex items-center text-sm text-gold pt-4 border-t border-gray-200">
                                                    <FaCalendar className="mr-2" />
                                                    {new Date(post.published_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination - Simple version */}
                            <div className="flex justify-center gap-4 mt-12">
                                {page > 1 && (
                                    <Link
                                        href={`/blog?page=${page - 1}`}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {posts.length >= 12 && (
                                    <Link
                                        href={`/blog?page=${page + 1}`}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </section>
        </div>
    );
}
