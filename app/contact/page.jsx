'use client';

import { useState } from 'react';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await api.contact.submit(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <Container>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-indigo-100">
                        Get in touch with us - we'd love to hear from you
                    </p>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>

                            {success && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-start space-x-3">
                                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="font-semibold">Message sent successfully!</p>
                                        <p className="text-sm">We'll get back to you as soon as possible.</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                                    <p className="font-semibold">Error</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none"
                                    />
                                </div>

                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <LoadingSpinner size="sm" className="mr-2" />
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <Card>
                                    <CardBody>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <FaEnvelope className="text-indigo-600" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                                <a href="mailto:info@chessclub.com" className="text-indigo-600 hover:text-indigo-700">
                                                    info@chessclub.com
                                                </a>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <FaPhone className="text-indigo-600" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                                <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-700">
                                                    +1 (234) 567-890
                                                </a>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <FaMapMarkerAlt className="text-indigo-600" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                                <p className="text-gray-600">
                                                    123 Chess Avenue<br />
                                                    City, State 12345
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>

                            {/* Optional: Add office hours or additional info */}
                            <div className="mt-8 bg-indigo-50 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                                <p className="text-gray-600">
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
