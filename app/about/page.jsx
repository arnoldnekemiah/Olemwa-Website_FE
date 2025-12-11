import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
    title: 'About Us',
    description: 'Learn more about our Olemwa Chess Club, our mission, and our leadership team.',
});

async function getAboutData() {
    try {
        const [aboutResponse, leadershipResponse] = await Promise.all([
            api.about.get().catch(() => ({ data: {} })),
            api.leadership.list().catch(() => ({ data: [] })),
        ]);

        return {
            about: aboutResponse.data || {},
            leadership: leadershipResponse.data || [],
        };
    } catch (error) {
        console.error('Error fetching about data:', error);
        return { about: {}, leadership: [] };
    }
}

export default async function AboutPage() {
    const { about, leadership } = await getAboutData();

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <Container>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-indigo-100">
                        {about.tagline || 'Learn more about our Olemwa Chess Club'}
                    </p>
                </Container>
            </section>

            {/* About Content */}
            <section className="py-16">
                <Container>
                    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                        {about.hero_image_url && (
                            <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={about.hero_image_url}
                                    alt="About us"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {about.mission && (
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">{about.mission}</p>
                            </div>
                        )}

                        {about.vision && (
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                                <p className="text-lg text-gray-700 leading-relaxed">{about.vision}</p>
                            </div>
                        )}

                        {about.description && (
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our Club</h2>
                                <div className="text-lg text-gray-700 leading-relaxed prose max-w-none">
                                    {about.description}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Leadership Section */}
                    {leadership.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Leadership</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {leadership.map((leader) => (
                                    <Card key={leader.id}>
                                        <CardBody className="text-center">
                                            {leader.photo_url && (
                                                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-indigo-100">
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
                                            {leader.bio && (
                                                <p className="text-gray-600 text-sm">{leader.bio}</p>
                                            )}
                                            {leader.email && (
                                                <a
                                                    href={`mailto:${leader.email}`}
                                                    className="text-indigo-600 hover:text-indigo-700 text-sm mt-2 inline-block"
                                                >
                                                    {leader.email}
                                                </a>
                                            )}
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}
