
import { useEffect, useRef } from "react";
import { Search, Lightbulb, Code, Rocket, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We dive deep into understanding your business needs, challenges, and objectives to create a solid foundation for success.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description: "Crafting a comprehensive roadmap tailored to your goals, ensuring every decision aligns with your vision.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Development",
    description: "Building robust, scalable solutions using cutting-edge technologies and industry best practices.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Seamless deployment with comprehensive testing, quality assurance, and performance optimization.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Continuous optimization, monitoring, and support to ensure sustained success and scalability.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      scrollContainerRef.current,
      {
        translateX: 0,
      },
      {
        translateX: () => {
          const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
          const windowWidth = window.innerWidth;
          return -(scrollWidth - windowWidth);
        },
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => {
            const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
            const windowWidth = window.innerWidth;
            return `+=${scrollWidth - windowWidth}`;
          },
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <div ref={triggerRef} className="h-screen">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div ref={scrollContainerRef} className="flex gap-8 px-6 lg:px-8">
            {/* Title Card */}
            <div className="min-w-[100vw] h-screen flex items-center justify-center">
              <div className="text-center max-w-3xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                    Process
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-foreground/70">
                  Scroll to explore our methodology →
                </p>
              </div>
            </div>

            {/* Process Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="min-w-[90vw] md:min-w-[600px] lg:min-w-[700px] h-screen flex items-center justify-center px-4"
              >
                <div className="relative w-full max-w-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 rounded-3xl blur-3xl`} />
                  <div className="relative bg-card/80 backdrop-blur-2xl border border-card-border/50 rounded-3xl p-12 lg:p-16 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r ${step.gradient} text-white`}>
                        Step {index + 1}
                      </span>
                    </div>

                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} p-6 mb-8`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                      {step.title}
                    </h3>
                    <div className={`h-1 w-32 bg-gradient-to-r ${step.gradient} rounded-full mb-8`} />
                    <p className="text-foreground/80 leading-relaxed text-lg md:text-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
            <div className="min-w-[100vw] h-screen flex items-center justify-center">
              <div className="text-center max-w-3xl">
                <h3 className="text-4xl md:text-6xl font-display font-bold mb-6">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">
                    Begin Your Journey?
                  </span>
                </h3>
                <p className="text-xl text-foreground/70 mb-8">
                  Let's transform your vision into reality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
