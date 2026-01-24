import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
    title: 'About Us',
    description: 'Learn more about our Olemwa Sports Club, our mission, and our leadership team.',
});

async function getAboutData() {
    try {
        const aboutResponse = await api.about.get().catch(() => ({ data: {} }));

        return {
            about: aboutResponse.data || {},
            leadership: aboutResponse.data?.leadership_team || [],
        };
    } catch (error) {
        console.error('Error fetching about data:', error);
        return { about: {}, leadership: [] };
    }
}

export default async function AboutPage() {
    const { about, leadership } = await getAboutData();

    return (
        <div className="bg-white-warm">
            {/* Hero Section */}
            <section className="bg-black-charcoal text-white py-20 border-b-2 border-gold">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                            About <span className="text-gold">Us</span>
                        </h1>
                        <p className="text-xl text-gray-300 animate-fadeInUp delay-200">
                            {about.tagline || 'Learn more about our Olemwa Sports Club'}
                        </p>
                    </div>
                </Container>
            </section>

            {/* About Content */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {/* Mission */}
                        {about.mission && (
                            <div className="mb-12">
                                <div className="flex items-center mb-4">
                                    <div className="h-1 w-12 bg-gold mr-4" />
                                    <h2 className="text-3xl font-bold text-black-charcoal">Our Mission</h2>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed pl-16">
                                    {about.mission}
                                </p>
                            </div>
                        )}

                        {/* Vision */}
                        {about.vision && (
                            <div className="mb-12">
                                <div className="flex items-center mb-4">
                                    <div className="h-1 w-12 bg-gold mr-4" />
                                    <h2 className="text-3xl font-bold text-black-charcoal">Our Vision</h2>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed pl-16">
                                    {about.vision}
                                </p>
                            </div>
                        )}

                        {/* Main Content */}
                        {about.main_content && (
                            <div className="mb-12">
                                <div className="flex items-center mb-4">
                                    <div className="h-1 w-12 bg-gold mr-4" />
                                    <h2 className="text-3xl font-bold text-black-charcoal">About Our Club</h2>
                                </div>
                                <div className="text-lg text-gray-700 leading-relaxed prose max-w-none pl-16">
                                    {about.main_content}
                                </div>
                            </div>
                        )}

                        {/* History */}
                        {about.history && (
                            <div className="mb-12">
                                <div className="flex items-center mb-4">
                                    <div className="h-1 w-12 bg-gold mr-4" />
                                    <h2 className="text-3xl font-bold text-black-charcoal">Our History</h2>
                                </div>
                                <div className="text-lg text-gray-700 leading-relaxed prose max-w-none pl-16">
                                    {about.history}
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </section>


            {/* Leadership Section */}
            {leadership.length > 0 && (
                <section className="py-16 bg-white-warm">
                    <Container>
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center justify-center mb-12">
                                <div className="h-1 w-12 bg-gold mr-4" />
                                <h2 className="text-4xl font-bold text-black-charcoal">Our Leadership Team</h2>
                                <div className="h-1 w-12 bg-gold ml-4" />
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {leadership.map((leader) => (
                                    <Card key={leader.id} className="overflow-hidden">
                                        {/* Background Image */}
                                        {leader.background_image_url && (
                                            <div className="relative h-32">
                                                <Image
                                                    src={leader.background_image_url}
                                                    alt={`${leader.name} background`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-black-charcoal/70 to-gold/50" />
                                            </div>
                                        )}

                                        <CardBody className="text-center">
                                            {/* Profile Photo - overlaps background if present */}
                                            {leader.photo_url && (
                                                <div className={`relative w-40 h-40 mx-auto rounded-full overflow-hidden ring-4 ring-gold shadow-lg ${leader.background_image_url ? '-mt-20 mb-4' : 'mb-4'}`}>
                                                    <Image
                                                        src={leader.photo_url}
                                                        alt={leader.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <h3 className="font-bold text-xl mb-1 text-black-charcoal">{leader.name}</h3>
                                            <p className="text-gold font-semibold mb-3">{leader.role}</p>
                                            {leader.bio && (
                                                <p className="text-gray-600 text-sm">{leader.bio}</p>
                                            )}
                                            {leader.email && (
                                                <a
                                                    href={`mailto:${leader.email}`}
                                                    className="text-gold hover:text-gold-dark text-sm mt-2 inline-block transition-colors"
                                                >
                                                    {leader.email}
                                                </a>
                                            )}
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            )}
        </div>
    );
}

