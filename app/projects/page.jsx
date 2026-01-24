import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata = generateMeta({
    title: 'Projects',
    description: 'Explore our ongoing and completed chess projects and initiatives.',
});

async function getProjects(page = 1) {
    try {
        const response = await api.projects.list(page, 12);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function ProjectsPage(props) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1');
    const projects = await getProjects(page);

    return (
        <div className="bg-white-warm min-h-screen">
            {/* Hero Section */}
            <section className="bg-black-charcoal text-white py-20 border-b-2 border-gold">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                            Our <span className="text-gold">Projects</span>
                        </h1>
                        <p className="text-xl text-gray-300 animate-fadeInUp delay-200">
                            Discover our initiatives to promote chess excellence and community growth
                        </p>
                    </div>
                </Container>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <Container>
                    {projects.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No projects available yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <Link href={`/projects/${project.id}`} key={project.id}>
                                        <Card hover className="h-full flex flex-col">
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
                                            <CardBody className="flex-1 flex flex-col">
                                                <div className="flex-1">
                                                    <h2 className="font-bold text-xl mb-3 text-black-charcoal">{project.title}</h2>
                                                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                                                </div>
                                                <div className="pt-4 border-t border-gray-200">
                                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${project.status === 'ongoing'
                                                        ? 'bg-gold text-black-charcoal'
                                                        : project.status === 'completed'
                                                            ? 'bg-black-charcoal text-gold border border-gold'
                                                            : 'bg-gray-200 text-gray-800'
                                                        }`}>
                                                        {project.status}
                                                    </span>
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
                                        href={`/projects?page=${page - 1}`}
                                        className="px-6 py-3 bg-gold text-black-charcoal rounded-lg hover:bg-gold-dark font-semibold transition-all"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {projects.length >= 12 && (
                                    <Link
                                        href={`/projects?page=${page + 1}`}
                                        className="px-6 py-3 bg-gold text-black-charcoal rounded-lg hover:bg-gold-dark font-semibold transition-all"
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
