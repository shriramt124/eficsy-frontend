"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolsTeaser() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="border-t border-gray-800 pt-24 flex flex-col lg:flex-row items-end justify-between gap-16">

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <span className="text-green-500 font-mono text-xs uppercase tracking-widest mb-4 block">
                            Interactive Tool
                        </span>

                        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-8">
                            Is your legacy stack <br />
                            <span className="text-gray-500">burning budget?</span>
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-md mb-12 font-light">
                            Calculate the precise impact of switching to a modern ELT architecture. See the math behind the savings.
                        </p>

                        <Link href="/tools/roi-calculator" className="group inline-flex items-center text-white border-b border-white pb-1 hover:text-green-400 hover:border-green-400 transition-colors">
                            <span className="text-sm font-medium uppercase tracking-widest mr-4">Launch Calculator</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {/* Abstract Preview */}
                    <div className="lg:w-5/12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-slate-900 border border-slate-800 p-8 relative overflow-hidden"
                        >
                            {/* Abstract UI Lines */}
                            <div className="space-y-6 opacity-50">
                                <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                                    <div className="h-2 w-24 bg-slate-700" />
                                    <div className="h-4 w-12 bg-green-900" />
                                </div>
                                <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                                    <div className="h-2 w-32 bg-slate-700" />
                                    <div className="h-4 w-16 bg-green-900" />
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <div className="h-2 w-20 bg-slate-600" />
                                    <div className="h-8 w-32 bg-green-500" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
