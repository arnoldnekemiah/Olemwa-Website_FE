import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import StructuredData from '@/components/StructuredData';
import { generateEventSchema } from '@/lib/seo';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';

async function getEvent(id) {
    try {
        const response = await api.events.getById(id);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);

    if (!event) {
        return {
            title: 'Event Not Found',
        };
    }

    return {
        title: event.title,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
        },
    };
}

export default async function EventDetailPage({ params }) {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);

    if (!event) {
        return (
            <div className="bg-gray-50 min-h-screen py-16">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                        <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
                        <Link href="/events" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                            ← Back to Events
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    const structuredData = generateEventSchema({
        name: event.title,
        description: event.description,
        startDate: event.event_date,
        endDate: event.event_date,
        location: event.location,
        image: null,
    });

    return (
        <>
            <StructuredData data={structuredData} />

            <div className="bg-gray-50 min-h-screen">

                {/* Content */}
                <Container className="py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Link */}
                        <Link
                            href="/events"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Events
                        </Link>

                        {/* Event Details */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            {/* Date Badge */}
                            <div className="flex items-start gap-6 mb-6">
                                <div className="flex-shrink-0 w-24 text-center bg-indigo-600 text-white rounded-lg p-4">
                                    <div className="text-4xl font-bold">
                                        {new Date(event.event_date).getDate()}
                                    </div>
                                    <div className="text-sm">
                                        {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                        {event.title}
                                    </h1>

                                    {/* Event Info */}
                                    <div className="space-y-3 text-gray-700 mb-8">
                                        <div className="flex items-center">
                                            <FaClock className="mr-3 text-indigo-600" size={20} />
                                            <span className="text-lg">
                                                {new Date(event.event_date).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>

                                        {event.location && (
                                            <div className="flex items-center">
                                                <FaMapMarkerAlt className="mr-3 text-indigo-600" size={20} />
                                                <span className="text-lg">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-lg max-w-none mt-8 pt-8 border-t border-gray-200">
                                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* Optional Registration Section */}
                            {event.registration_url && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <a
                                        href={event.registration_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Register for Event
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
