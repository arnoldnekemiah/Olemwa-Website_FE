import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChessKnight } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
        ],
        community: [
            { href: '/events', label: 'Events' },
            { href: '/contact', label: 'Contact' },
        ],
    };

    const socialLinks = [
        { href: '#', icon: FaFacebook, label: 'Facebook' },
        { href: '#', icon: FaTwitter, label: 'Twitter' },
        { href: '#', icon: FaInstagram, label: 'Instagram' },
        { href: '#', icon: FaLinkedin, label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <FaChessKnight className="text-3xl text-indigo-400" />
                            <span className="text-xl font-bold text-white">Olemwa Chess Club</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Promoting chess excellence and building a strong community of players.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                                        aria-label={social.label}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Community</h3>
                        <ul className="space-y-2">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} Olemwa Chess Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
