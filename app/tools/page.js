import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { ContactCTA } from "../about/page";

export const metadata = {
    title: "Interactive Data Tools | Eficsy",
    description: "Free interactive tools for data engineers and leaders. Calculate ROI, assess data maturity, and build your modern data stack.",
};

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-black to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Data Tools</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Calculators, quizzes, and builders to help you make better decisions about your data infrastructure.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* ROI Calculator Card */}
                        <Link href="/tools/roi-calculator" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <Calculator size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                    Modern Stack ROI Calculator
                                </h3>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Quantify the hidden costs of your legacy ETL pipelines and see how much you could save by switching to a modern ELT stack.
                                </p>

                                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    Try Calculator <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Stack Builder Card */}
                        <Link href="/tools/stack-builder" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <span className="text-2xl">🏗️</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    Stack Architect
                                </h3>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Visually design your dream data architecture. Stress test your stack and generate a hiring plan.
                                </p>

                                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    Start Building <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Coming Soon Card 1 */}
                        <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200 opacity-60 cursor-not-allowed">
                            <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 mb-6">
                                <span className="text-2xl">🧠</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-500 mb-3">
                                Data Maturity Quiz
                            </h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                Assess your organization's data capabilities and get a personalized roadmap to level up.
                            </p>
                            <div className="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider rounded-full">
                                Coming Soon
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <ContactCTA />
        </main>
    );
}
