import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FaChessKnight, FaArrowRight, FaCalendar, FaUser } from 'react-icons/fa';

async function getHomeData() {
    try {
        const [blogResponse, leadershipResponse, projectsResponse, eventsResponse] = await Promise.all([
            api.blog.list(1, 4).catch(() => ({ data: [] })),
            api.leadership.list().catch(() => ({ data: [] })),
            api.projects.list(1, 3).catch(() => ({ data: [] })),
            api.events.list(1, 3).catch(() => ({ data: [] })),
        ]);

        return {
            blogs: blogResponse.data || [],
            leadership: leadershipResponse.data || [],
            projects: projectsResponse.data || [],
            events: eventsResponse.data || [],
        };
    } catch (error) {
        console.error('Error fetching home data:', error);
        return { blogs: [], leadership: [], projects: [], events: [] };
    }
}

export default async function HomePage() {
    const { blogs, leadership, projects, events } = await getHomeData();

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white">
                <Container className="py-20 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <FaChessKnight className="text-8xl animate-bounce" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            Welcome to Olemwa Chess Club
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 text-indigo-100">
                            Promoting chess excellence and building a strong community of players
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/about">
                                <Button variant="primary" className="bg-white text-indigo-600 hover:bg-gray-100">
                                    Learn More
                                </Button>
                            </Link>
                            <Link href="/events">
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    View Events
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Latest Blog Posts */}
            {blogs.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <Container>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
                            <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
                                View All <FaArrowRight />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {blogs.slice(0, 4).map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id}>
                                    <Card hover className="h-full">
                                        {post.cover_image_url && (
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={post.cover_image_url}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardBody>
                                            <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <FaCalendar className="mr-2" />
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Leadership Spotlight */}
            {leadership.length > 0 && (
                <section className="py-16 bg-white">
                    <Container>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Our Leadership</h2>
                            <Link href="/about" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
                                Meet the Team <FaArrowRight />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {leadership.slice(0, 3).map((leader) => (
                                <Card key={leader.id} className="text-center">
                                    <CardBody>
                                        {leader.photo_url && (
                                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                                <Image
                                                    src={leader.photo_url}
                                                    alt={leader.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <h3 className="font-bold text-xl mb-1">{leader.name}</h3>
                                        <p className="text-indigo-600 font-semibold mb-3">{leader.role}</p>
                                        <p className="text-gray-600 text-sm">{leader.bio}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Ongoing Projects */}
            {projects.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <Container>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Ongoing Projects</h2>
                            <Link href="/projects" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
                                View All <FaArrowRight />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.slice(0, 3).map((project) => (
                                <Link href={`/projects/${project.id}`} key={project.id}>
                                    <Card hover className="h-full">
                                        {project.cover_image_url && (
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={project.cover_image_url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardBody>
                                            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'ongoing' ? 'bg-green-100 text-green-800' : project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Upcoming Events */}
            {events.length > 0 && (
                <section className="py-16 bg-white">
                    <Container>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
                            <Link href="/events" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
                                View All <FaArrowRight />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {events.slice(0, 3).map((event) => (
                                <Link href={`/events/${event.id}`} key={event.id}>
                                    <Card hover>
                                        <CardBody className="flex flex-col md:flex-row gap-4">
                                            <div className="md:w-24 text-center bg-indigo-600 text-white rounded-lg p-4">
                                                <div className="text-3xl font-bold">
                                                    {new Date(event.event_date).getDate()}
                                                </div>
                                                <div className="text-sm">
                                                    {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                                                <p className="text-gray-600 mb-2">{event.description}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(event.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    {event.location && ` • ${event.location}`}
                                                </p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </div>
    );
}
