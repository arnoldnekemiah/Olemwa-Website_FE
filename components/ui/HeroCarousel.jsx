'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const carouselImages = [
    { src: '/group_men.png', alt: 'Olemwa Sports Club Group Men' },
    { src: '/team_pic.png', alt: 'Olemwa Sports Club Team' },
    { src: '/team2.png', alt: 'Olemwa Sports Club Team 2' },
    { src: '/ladies.png', alt: 'Olemwa Sports Club Ladies' },
    { src: '/IMG_3830.jpg', alt: 'Olemwa Sports Club Members' },
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [isTransitioning]);

    const goToPrev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [isTransitioning]);

    const goToSlide = useCallback((index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [isTransitioning, currentIndex]);

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Images */}
            {carouselImages.map((image, index) => (
                <div
                    key={image.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-top"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Dark Overlay for text readability - lighter to show images better */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

            {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-gold/80 text-white hover:text-black-charcoal transition-all duration-300 backdrop-blur-sm group"
                aria-label="Previous image"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-gold/80 text-white hover:text-black-charcoal transition-all duration-300 backdrop-blur-sm group"
                aria-label="Next image"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-gold w-8'
                            : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
                <div
                    className="h-full bg-gold transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / carouselImages.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
