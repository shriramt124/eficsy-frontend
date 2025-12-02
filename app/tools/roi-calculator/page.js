import ROICalculator from "../../components/tools/ROICalculator";
import { ContactCTA } from "../../about/page";

export const metadata = {
    title: "Modern Data Stack ROI Calculator | Eficsy",
    description: "Calculate how much your team could save by switching from legacy ETL to a modern ELT stack (Snowflake, dbt, BigQuery).",
};

export default function ROICalculatorPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-900/40 via-black to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-sm font-semibold mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Free Interactive Tool
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Stop Burning Money on <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Legacy ETL</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        See exactly how much time and budget your team could reclaim by modernizing your data infrastructure.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="relative -mt-20 z-20 pb-20 px-4">
                <ROICalculator />
            </section>

            {/* Explanation Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How We Calculate Your Savings</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">The Legacy Trap</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Traditional ETL tools (Informatica, Talend, SSIS) require dedicated servers and heavy maintenance.
                                Our data shows that teams spend <strong>40-60%</strong> of their time just fixing broken pipelines instead of building new value.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span> High licensing costs
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span> Slow "waterfall" development
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span> Data is stale by the time it arrives
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">The Modern Advantage</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Modern ELT stacks (Snowflake/BigQuery + dbt) separate compute from storage and use SQL for transformations.
                                This reduces maintenance overhead by <strong>~60%</strong> and allows your team to move 10x faster.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span> Pay-as-you-go compute
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span> Software engineering best practices (CI/CD)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span> Instant access to raw data
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <ContactCTA />
        </main>
    );
}
