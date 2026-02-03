import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About Us' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
        ],
        community: [
            { href: '/events', label: 'Events' },
            { href: '/contact', label: 'Contact' },
        ],
    };

    const socialLinks = [
        { href: '#', icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-500' },
        { href: '#', icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400' },
        { href: '#', icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-500' },
        { href: '#', icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold shadow-lg">
                                <Image
                                    src="/logo.jpg"
                                    alt="Olemwa Sports Club Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white block">Olemwa</span>
                                <span className="text-sm text-gold font-medium">Sports Club</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Promoting sports excellence and building a strong community of athletes through chess and strategic thinking.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                            <span className="w-8 h-0.5 bg-gold mr-3"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center group"
                                    >
                                        <FaChevronRight className="text-xs mr-2 text-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                            <span className="w-8 h-0.5 bg-gold mr-3"></span>
                            Community
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center group"
                                    >
                                        <FaChevronRight className="text-xs mr-2 text-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                            <span className="w-8 h-0.5 bg-gold mr-3"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <FaMapMarkerAlt className="text-gold text-sm" />
                                </div>
                                <span className="text-gray-400 text-sm">Uganda</span>
                            </li>
                            <li className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <FaEnvelope className="text-gold text-sm" />
                                </div>
                                <a href="mailto:info@olemwachessclub.com" className="text-gray-400 hover:text-gold transition-colors text-sm">
                                    info@olemwachessclub.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} <span className="text-gold">Olemwa Sports Club</span>. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-500 hover:text-gold text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-gold text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
