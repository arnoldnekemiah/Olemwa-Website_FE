import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { FaChessKnight, FaArrowRight, FaCalendar, FaTrophy, FaCrown } from 'react-icons/fa';

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
            {/* Hero Section with Background Image */}
            <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
                {/* Image Carousel */}
                <HeroCarousel />

                {/* Hero Content */}
                <Container className="relative z-10 py-20 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Animated Chess Icon */}
                        <div className="flex justify-center mb-8 animate-fadeInDown">
                            <FaCrown className="text-7xl lg:text-8xl text-gold animate-gentlePulse" />
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white animate-fadeInUp">
                            Welcome to <span className="text-gold">Olemwa</span> Sports Club
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl lg:text-2xl mb-10 text-gray-300 animate-fadeInUp delay-200">
                            Where strategy meets excellence in the royal game
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-400">
                            <Link href="/about">
                                <Button variant="primary" className="w-full sm:w-auto">
                                    <span className="flex items-center gap-2">
                                        Discover Our Story
                                        <FaArrowRight />
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/events">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    View Upcoming Events
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>

                {/* Decorative Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient" />
            </section>

            {/* Latest Blog Posts */}
            {blogs.length > 0 && (
                <section className="py-20 bg-white-warm">
                    <Container>
                        <AnimatedSection animation="animate-fadeInUp">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold text-black-charcoal mb-2">
                                        Latest <span className="text-gold">News</span>
                                    </h2>
                                    <div className="h-1 w-24 bg-gold" />
                                </div>
                                <Link
                                    href="/blog"
                                    className="text-gold hover:text-gold-dark font-semibold flex items-center gap-2 transition-colors"
                                >
                                    View All <FaArrowRight />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {blogs.slice(0, 4).map((post, index) => (
                                <AnimatedSection
                                    key={post.id}
                                    animation="animate-fadeInUp"
                                    delay={index * 100}
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <Card hover className="h-full">
                                            {post.cover_image_url && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Image
                                                        src={post.cover_image_url}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-black-charcoal">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center text-sm text-gold">
                                                    <FaCalendar className="mr-2" />
                                                    {new Date(post.published_at).toLocaleDateString()}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Leadership Spotlight */}
            {leadership.length > 0 && (
                <section className="py-20 bg-black-charcoal text-white">
                    <Container>
                        <AnimatedSection animation="animate-fadeInUp">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        Our <span className="text-gold">Leadership</span>
                                    </h2>
                                    <div className="h-1 w-24 bg-gold" />
                                </div>
                                <Link
                                    href="/about"
                                    className="text-gold hover:text-gold-dark font-semibold flex items-center gap-2 transition-colors"
                                >
                                    Meet the Team <FaArrowRight />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {leadership.slice(0, 3).map((leader, index) => (
                                <AnimatedSection
                                    key={leader.id}
                                    animation="animate-scaleIn"
                                    delay={index * 150}
                                >
                                    <Card className="text-center bg-black-soft border border-gold/20 hover:border-gold">
                                        <CardBody>
                                            {leader.photo_url && (
                                                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gold">
                                                    <Image
                                                        src={leader.photo_url}
                                                        alt={leader.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <h3 className="font-bold text-xl mb-1 text-white">{leader.name}</h3>
                                            <p className="text-gold font-semibold mb-3">{leader.role}</p>
                                            <p className="text-gray-400 text-sm">{leader.bio}</p>
                                        </CardBody>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Ongoing Projects */}
            {projects.length > 0 && (
                <section className="py-20 bg-white-warm">
                    <Container>
                        <AnimatedSection animation="animate-fadeInUp">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold text-black-charcoal mb-2">
                                        Active <span className="text-gold">Projects</span>
                                    </h2>
                                    <div className="h-1 w-24 bg-gold" />
                                </div>
                                <Link
                                    href="/projects"
                                    className="text-gold hover:text-gold-dark font-semibold flex items-center gap-2 transition-colors"
                                >
                                    View All <FaArrowRight />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.slice(0, 3).map((project, index) => (
                                <AnimatedSection
                                    key={project.id}
                                    animation="animate-fadeInUp"
                                    delay={index * 100}
                                >
                                    <Link href={`/projects/${project.id}`}>
                                        <Card hover className="h-full">
                                            {project.cover_image_url && (
                                                <div className="relative h-56 w-full overflow-hidden">
                                                    <Image
                                                        src={project.cover_image_url}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <h3 className="font-bold text-xl mb-2 text-black-charcoal">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                                                <span
                                                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${project.status === 'ongoing'
                                                        ? 'bg-gold text-black-charcoal'
                                                        : project.status === 'completed'
                                                            ? 'bg-black-charcoal text-gold border border-gold'
                                                            : 'bg-gray-200 text-gray-800'
                                                        }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Upcoming Events */}
            {events.length > 0 && (
                <section className="py-20 bg-black-charcoal text-white">
                    <Container>
                        <AnimatedSection animation="animate-fadeInUp">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        Upcoming <span className="text-gold">Events</span>
                                    </h2>
                                    <div className="h-1 w-24 bg-gold" />
                                </div>
                                <Link
                                    href="/events"
                                    className="text-gold hover:text-gold-dark font-semibold flex items-center gap-2 transition-colors"
                                >
                                    View All <FaArrowRight />
                                </Link>
                            </div>
                        </AnimatedSection>

                        <div className="space-y-6">
                            {events.slice(0, 3).map((event, index) => (
                                <AnimatedSection
                                    key={event.id}
                                    animation="animate-slideInLeft"
                                    delay={index * 100}
                                >
                                    <Link href={`/events/${event.id}`}>
                                        <Card hover className="bg-black-soft border border-gold/20">
                                            <CardBody className="flex flex-col md:flex-row gap-6">
                                                <div className="md:w-28 text-center bg-gold text-black-charcoal rounded-lg p-4 flex-shrink-0">
                                                    <div className="text-4xl font-bold">
                                                        {new Date(event.event_date).getDate()}
                                                    </div>
                                                    <div className="text-sm font-semibold">
                                                        {new Date(event.event_date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-2xl mb-2 text-white">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-gray-400 mb-3">{event.description}</p>
                                                    <p className="text-sm text-gold flex items-center gap-2">
                                                        <FaCalendar />
                                                        {new Date(event.event_date).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                        {event.location && ` • ${event.location}`}
                                                    </p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </div>
    );
}
