import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
    title: 'Events',
    description: 'Discover upcoming chess events, tournaments, and community gatherings.',
});

async function getEvents(page = 1) {
    try {
        const response = await api.events.list(page, 12);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export default async function EventsPage(props) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1');
    const events = await getEvents(page);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <Container>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Events</h1>
                    <p className="text-xl text-indigo-100">
                        Join us for exciting chess tournaments and community events
                    </p>
                </Container>
            </section>

            {/* Events List */}
            <section className="py-16">
                <Container>
                    {events.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No upcoming events at the moment.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-8">
                                {events.map((event) => (
                                    <Link href={`/events/${event.id}`} key={event.id}>
                                        <Card hover className="h-full">
                                            <CardBody>
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="flex-shrink-0 w-16 text-center bg-indigo-600 text-white rounded-lg p-3">
                                                        <div className="text-2xl font-bold">
                                                            {new Date(event.event_date).getDate()}
                                                        </div>
                                                        <div className="text-xs">
                                                            {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h2 className="font-bold text-xl mb-2">{event.title}</h2>
                                                        <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                                                    <div className="flex items-center">
                                                        <FaClock className="mr-2 text-indigo-600" />
                                                        <span>
                                                            {new Date(event.event_date).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                    {event.location && (
                                                        <div className="flex items-center">
                                                            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-4 mt-12">
                                {page > 1 && (
                                    <Link
                                        href={`/events?page=${page - 1}`}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {events.length >= 12 && (
                                    <Link
                                        href={`/events?page=${page + 1}`}
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
