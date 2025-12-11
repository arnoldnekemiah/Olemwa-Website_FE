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
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <Container>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Projects</h1>
                    <p className="text-xl text-indigo-100">
                        Discover our initiatives to promote chess excellence
                    </p>
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
                                                <div className="relative h-56 w-full">
                                                    <Image
                                                        src={project.cover_image_url}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <CardBody className="flex-1 flex flex-col">
                                                <div className="flex-1">
                                                    <h2 className="font-bold text-xl mb-3">{project.title}</h2>
                                                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                                                </div>
                                                <div className="pt-4 border-t border-gray-200">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'ongoing'
                                                        ? 'bg-green-100 text-green-800'
                                                        : project.status === 'completed'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-gray-100 text-gray-800'
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
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {projects.length >= 12 && (
                                    <Link
                                        href={`/projects?page=${page + 1}`}
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
