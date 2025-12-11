import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import { FaArrowLeft } from 'react-icons/fa';

async function getProject(id) {
    try {
        const response = await api.projects.getById(id);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const project = await getProject(resolvedParams.id);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.cover_image_url ? [{ url: project.cover_image_url }] : [],
        },
    };
}

export default async function ProjectDetailPage({ params }) {
    const resolvedParams = await params;
    const project = await getProject(resolvedParams.id);

    if (!project) {
        return (
            <div className="bg-gray-50 min-h-screen py-16">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
                        <Link href="/projects" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                            ← Back to Projects
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Image */}
            {project.cover_image_url && (
                <div className="relative w-full h-96 bg-gray-200">
                    <Image
                        src={project.cover_image_url}
                        alt={project.title}
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
                        href="/projects"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Projects
                    </Link>

                    {/* Project Header */}
                    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 flex-1">
                                {project.title}
                            </h1>
                            <span className={`ml-4 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${project.status === 'ongoing'
                                ? 'bg-green-100 text-green-800'
                                : project.status === 'completed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                {project.status}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>

                        {/* Additional Info */}
                        {project.start_date && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Started:</span>{' '}
                                    {new Date(project.start_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                {project.end_date && (
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-semibold">Completed:</span>{' '}
                                        {new Date(project.end_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
