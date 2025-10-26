"use client";

import { useState, useEffect } from 'react';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: 'slideimage1.jpg',
            title: 'WE WORKS THE WAY',
            subtitle: 'THAT WORKS FOR YOU IN EFICSY',
            description: 'Empowering businesses with cutting-edge technology solutions that drive growth and accelerate digital transformation',
            valueProps: 'Expert Team • Proven Results • 24/7 Support • Tailored Solutions',
            isDefault: true,
            bgPosition: 'center'
        },
        {
            image: 'slideimage1.jpg',
            title: 'AI-Powered Solutions',
            description: 'Transform your business with cutting-edge artificial intelligence and machine learning technologies.',
            detailedContent: 'Leveraging advanced AI algorithms and neural networks to create intelligent systems that learn, adapt, and optimize your business processes in real-time. Our AI solutions include predictive analytics, natural language processing, computer vision, and automated decision-making systems.',
            cards: [
                { 
                    title: 'Machine Learning', 
                    text: 'Advanced ML algorithms that continuously learn from your data to improve accuracy and performance over time.',
                    image: '�'
                },
                { 
                    title: 'Neural Networks', 
                    text: 'Deep learning models capable of handling complex patterns and making sophisticated predictions.',
                    image: '🧠'
                },
                { 
                    title: 'Predictive Analytics', 
                    text: 'Turn your data into actionable insights with powerful forecasting and trend analysis tools.',
                    image: '📊'
                }
            ],
            bgPosition: 'center'
        },
        {
            image: 'slideimage2.jpg',
            title: 'Digital Innovation',
            description: 'Building scalable, secure, and innovative digital products that drive growth and efficiency.',
            detailedContent: 'From concept to deployment, we craft custom digital solutions using modern frameworks and cloud technologies to ensure your business stays ahead of the competition. We specialize in creating responsive web applications, mobile apps, and enterprise software solutions.',
            cards: [
                { 
                    title: 'Modern Tech Stack', 
                    text: 'Built with the latest frameworks like React, Next.js, and Node.js for optimal performance and scalability.',
                    image: '🚀'
                },
                { 
                    title: 'Cloud Infrastructure', 
                    text: 'Scalable cloud solutions on AWS, Azure, and Google Cloud with automatic scaling and high availability.',
                    image: '☁️'
                },
                { 
                    title: 'Security & Compliance', 
                    text: 'Enterprise-grade security with encryption, authentication, and compliance with industry standards.',
                    image: '�'
                }
            ],
            bgPosition: 'center'
        },
        {
            image: 'slideimg3.jpg',
            title: 'Expert Team',
            description: 'Collaborate with experienced professionals dedicated to delivering excellence in every project.',
            detailedContent: 'Our team of seasoned developers, designers, and strategists work together to bring your vision to life with precision, creativity, and unwavering commitment to quality. With over 10 years of combined experience, we deliver projects on time and exceed expectations.',
            cards: [
                { 
                    title: 'Development Excellence', 
                    text: 'Our senior developers bring 10+ years of experience in building robust, scalable applications.',
                    image: '👨‍�'
                },
                { 
                    title: 'Creative Design', 
                    text: 'Award-winning designers who create beautiful, intuitive interfaces that users love.',
                    image: '🎨'
                },
                { 
                    title: '24/7 Support', 
                    text: 'Round-the-clock dedicated support ensuring your success at every step of the journey.',
                    image: '🤝'
                }
            ],
            bgPosition: 'center'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = (prev + 1) % slides.length;
                return nextSlide;
            });
        }, currentSlide === 0 ? 10000 : 5000); // 10 seconds for first slide, 5 seconds for others

        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        
        <div className="w-full min-h-screen relative flex flex-col lg:flex-row">
             
            

            {/* Right Half - Slideshow with Background Images */}
            <div className="w-full lg:w-full min-h-[400px] sm:min-h-[480px] md:min-h-[550px] lg:min-h-screen relative overflow-hidden bg-gray-900">
                {/* Slideshow Container */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 group ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundPosition: slide.bgPosition
                            }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500"></div>
                        </div>

                        {slide.isDefault ? (
                            /* Default Slide - Centered Content */
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8 lg:px-16 pt-16 sm:pt-20 pb-24">
                                <div className="max-w-5xl text-center w-full">
                                    {/* Main Heading */}
                                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4">
                                        <span className="text-white">{slide.title} </span>
                                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                            {slide.subtitle}
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-5 leading-relaxed max-w-3xl mx-auto">
                                        {slide.description}
                                    </p>

                                    {/* Value Proposition */}
                                    <p className="text-[10px] sm:text-xs md:text-sm text-cyan-300 mb-5 sm:mb-6 font-medium">
                                        {slide.valueProps}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8">
                                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                                            Get free consultation Now
                                        </button>
                                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300">
                                           Let's Connect
                                        </button>
                                    </div>

                                    {/* Stats - Compact Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                                        <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg py-3 px-2 border border-white/10">
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">10+</div>
                                            <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Years Experience</div>
                                        </div>
                                        <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg py-3 px-2 border border-white/10">
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                                            <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Projects Delivered</div>
                                        </div>
                                        <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg py-3 px-2 border border-white/10">
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
                                            <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Client Satisfaction</div>
                                        </div>
                                        <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg py-3 px-2 border border-white/10">
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                                            <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Team Members</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Complete Bento Grid Layout */
                            <div className="absolute inset-0 px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 z-10">
                                <div className="max-w-7xl mx-auto">
                                    {/* Unified Bento Grid - 6 columns */}
                                    <div className="grid grid-cols-6 auto-rows-fr gap-3 sm:gap-4 h-[500px] sm:h-[550px] lg:h-[600px]">
                                        {/* Title Card - Large */}
                                        <div className="col-span-6 sm:col-span-3 row-span-2 backdrop-blur-md bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 sm:p-8 border border-white/30 flex flex-col justify-center group hover:border-cyan-500/50 transition-all duration-300">
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                                                {slide.title}
                                            </h2>
                                            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                                                {slide.description}
                                            </p>
                                        </div>

                                        {/* Feature Cards */}
                                        {slide.cards && slide.cards.map((card, idx) => {
                                            // Define bento grid positions
                                            const gridClasses = idx === 0 
                                                ? 'col-span-3 sm:col-span-3 row-span-2' // Medium-large
                                                : idx === 1
                                                ? 'col-span-3 sm:col-span-2 row-span-2' // Medium
                                                : idx === 2
                                                ? 'col-span-3 sm:col-span-2 row-span-2' // Medium
                                                : 'col-span-3 sm:col-span-2 row-span-2'; // Medium
                                            
                                            return (
                                                <div 
                                                    key={idx}
                                                    className={`${gridClasses} backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between overflow-hidden group`}
                                                >
                                                    {/* Highlight Badge */}
                                                    <div className="inline-flex self-start">
                                                        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 mb-2 sm:mb-3">
                                                            {card.highlight}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Card Title */}
                                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 leading-tight">
                                                        {card.title}
                                                    </h3>
                                                    
                                                    {/* Card Description */}
                                                    <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed flex-grow overflow-hidden">
                                                        {card.text}
                                                    </p>

                                                    {/* Decorative Bottom Line */}
                                                    <div className="mt-auto pt-3">
                                                        <div className="h-0.5 w-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Learn More Button Card - Last Card */}
                                        <div className="col-span-6 sm:col-span-2 row-span-2 backdrop-blur-md bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/40 hover:border-cyan-500/60 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 cursor-pointer group">
                                            <div className="text-center">
                                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Learn More</h3>
                                                <p className="text-xs sm:text-sm text-cyan-200">Discover our solutions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-white w-8' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Bottom Strip - Customer Satisfaction & Support */}
            <div className="absolute bottom-0 left-0 right-0 bg-white py-3 sm:py-4 z-30">
                <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 px-4 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
                            98% Customer Satisfaction
                        </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-gray-300 hidden sm:block"></div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
                            24/7 Support
                        </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-gray-300 hidden sm:block"></div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
                            Secure & Reliable
                        </span>
                    </div>
                    <div className="h-6 sm:h-8 w-px bg-gray-300 hidden md:block"></div>
                    <div className="hidden md:flex items-center gap-2 sm:gap-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
                            Free Consultation Now
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}