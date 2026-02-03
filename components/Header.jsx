'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/events', label: 'Events' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black-charcoal/95 backdrop-blur-md shadow-lg'
                : 'bg-black-charcoal'
                } border-b-2 ${scrolled ? 'border-gold' : 'border-gold/30'}`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 text-xl font-bold text-white group"
                    >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logo.jpg"
                                alt="Olemwa Sports Club Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="hidden sm:inline">
                            Olemwa <span className="text-gold">Sports Club</span>
                        </span>
                        <span className="sm:hidden text-gold">Olemwa</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-white hover:text-gold transition-colors duration-300 font-medium group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white hover:text-gold transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 animate-fadeInDown">
                        <div className="flex flex-col space-y-4 bg-black-soft p-4 rounded-lg border border-gold/20">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white hover:text-gold transition-colors duration-300 font-medium animate-fadeInUp"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
