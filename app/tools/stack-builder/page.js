import StackBuilder from "../../components/tools/StackBuilder";
import { ContactCTA } from "../../about/page";

export const metadata = {
    title: "Modern Data Stack Architect | Eficsy",
    description: "Visually design your data infrastructure. Stress test your stack, estimate costs, and generate a hiring plan.",
};

export default function StackBuilderPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Header / Toolbar */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h1 className="text-sm font-bold uppercase tracking-widest text-slate-200">
                            Stack Architect <span className="text-slate-600 ml-2">v1.0</span>
                        </h1>
                    </div>
                    <div className="text-xs text-slate-500 font-mono hidden sm:block">
                        EFICSY INTELLIGENCE ENGINE
                    </div>
                </div>
            </div>

            {/* Main Tool Area */}
            <div className="max-w-[1600px] mx-auto">
                <StackBuilder />
            </div>

            {/* Footer / CTA */}
            <section className="py-20 border-t border-neutral-200 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-light text-neutral-900 mb-6">Need an expert to review your architecture?</h2>
                    <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Our team of principal engineers can validate your design and help you implement it.
                    </p>
                    <ContactCTA />
                </div>
            </section>
        </main>
    );
}
