'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Fetch contact information from CMS
    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await api.contact.getInfo();
                setContactInfo(response.data);
            } catch (err) {
                console.error('Error fetching contact info:', err);
            } finally {
                setPageLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

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

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="bg-white-warm min-h-screen">
            {/* Hero Section */}
            <section className="bg-black-charcoal text-white py-20 border-b-2 border-gold">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                            Contact <span className="text-gold">Us</span>
                        </h1>
                        <p className="text-xl text-gray-300 animate-fadeInUp delay-200">
                            Get in touch with us - we'd love to hear from you
                        </p>
                    </div>
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
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
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all resize-none"
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

                        {/* Contact Information - CMS Driven */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                {/* Email */}
                                {contactInfo?.email && (
                                    <Card>
                                        <CardBody>
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                                    <FaEnvelope className="text-gold" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                                    <a href={`mailto:${contactInfo.email}`} className="text-gold hover:text-gold-dark">
                                                        {contactInfo.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                )}

                                {/* Phone */}
                                {contactInfo?.phone && (
                                    <Card>
                                        <CardBody>
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                                    <FaPhone className="text-gold" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                                    <a href={`tel:${contactInfo.phone}`} className="text-gold hover:text-gold-dark">
                                                        {contactInfo.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                )}

                                {/* Location */}
                                {contactInfo?.location && (
                                    <Card>
                                        <CardBody>
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                                                    <FaMapMarkerAlt className="text-gold" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                                    <p className="text-gray-600 whitespace-pre-line">
                                                        {contactInfo.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                )}
                            </div>

                            {/* Social Media Links */}
                            {(contactInfo?.facebook_url || contactInfo?.twitter_url || contactInfo?.instagram_url) && (
                                <div className="mt-8 bg-gold-light rounded-lg p-6 border-2 border-gold/30">
                                    <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        {contactInfo.facebook_url && (
                                            <a
                                                href={contactInfo.facebook_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-gold-dark transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <FaFacebook size={20} />
                                            </a>
                                        )}
                                        {contactInfo.twitter_url && (
                                            <a
                                                href={contactInfo.twitter_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-gold-dark transition-colors"
                                                aria-label="Twitter"
                                            >
                                                <FaTwitter size={20} />
                                            </a>
                                        )}
                                        {contactInfo.instagram_url && (
                                            <a
                                                href={contactInfo.instagram_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-gold-dark transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <FaInstagram size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
