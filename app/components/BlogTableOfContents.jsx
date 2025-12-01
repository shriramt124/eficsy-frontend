"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogTableOfContents({ headings }) {
    const [activeId, setActiveId] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setScrollProgress(progress);

            // Find active heading
            const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);

            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (element && element.getBoundingClientRect().top < 200) {
                    setActiveId(element.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <aside className="sticky top-24 hidden lg:block relative">
            {/* Progress bar */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-200">
                <div
                    className="w-full bg-green-600 transition-all duration-300"
                    style={{ height: `${scrollProgress}%` }}
                />
            </div>

            <div className="pl-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    On This Page
                </h3>
                <nav className="space-y-2">
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`block text-sm text-left transition-all duration-200 ${activeId === heading.id
                                    ? 'text-green-600 font-semibold translate-x-2'
                                    : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'
                                }`}
                            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                        >
                            {heading.text}
                        </button>
                    ))}
                </nav>

                {/* Reading stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-xs text-gray-500 space-y-2">
                        <div className="flex items-center gap-2">
                            <span>📖</span>
                            <span>Reading Progress: {Math.round(scrollProgress)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
