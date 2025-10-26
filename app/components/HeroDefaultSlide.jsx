import Aurora from "@/components/Aurora"

export default function HeroDefaultSlide(){
    return (
        <div className="absolute inset-0">
            {/* Aurora Background */}
            <div className="absolute inset-0">
                <Aurora
                    colorStops={["#01632d", "#025522", "#0d7585"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8 lg:px-16 pt-16 sm:pt-20 pb-16">
                <div className="max-w-5xl text-center w-full">
                    {/* Main Heading */}
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 sm:mb-4">
                        <span className="text-white">TRANSFORM YOUR BUSINESS WITH </span>
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            INNOVATIVE SOLUTIONS
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-5 leading-relaxed max-w-3xl mx-auto">
                        Empowering businesses with cutting-edge technology solutions that drive growth and accelerate digital transformation
                    </p>

                    {/* Value Proposition */}
                    <p className="text-[10px] sm:text-xs md:text-sm text-cyan-300 mb-5 sm:mb-6 font-medium">
                         Expert Team • Proven Results • 24/7 Support • Tailored Solutions
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8">
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                            Get Started Now
                        </button>
                        <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300">
                            View Our Work
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
        </div>
    )
}