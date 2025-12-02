"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, ChevronUp, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ROICalculator() {
    // State for inputs
    const [teamSize, setTeamSize] = useState(3);
    const [avgSalary, setAvgSalary] = useState(120000);
    const [maintenanceLoad, setMaintenanceLoad] = useState(40); // %
    const [legacySpend, setLegacySpend] = useState(5000); // Monthly
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [showBenchmarks, setShowBenchmarks] = useState(false);

    // State for results
    const [results, setResults] = useState({
        wastedCost: 0,
        modernCost: 0,
        savings: 0,
        hoursSaved: 0,
        legacyLabor: 0,
        legacyTools: 0,
        modernLabor: 0,
        modernTools: 0,
    });

    // Calculate results whenever inputs change
    useEffect(() => {
        // LEGACY COSTS
        const wastedFTEs = teamSize * (maintenanceLoad / 100);
        const legacyLaborCost = wastedFTEs * avgSalary;
        const legacyToolCost = legacySpend * 12;
        const totalLegacyCost = legacyLaborCost + legacyToolCost;

        // MODERN COSTS
        // Assumption: Modern stack reduces maintenance by 60% (Conservative)
        const modernMaintenanceFactor = 0.4;
        const modernFTEs = wastedFTEs * modernMaintenanceFactor;
        const modernLaborCost = modernFTEs * avgSalary;

        // Assumption: Modern Cloud Spend
        let estimatedModernToolSpend = teamSize * 500 * 12;
        if (estimatedModernToolSpend > legacyToolCost) {
            estimatedModernToolSpend = legacyToolCost * 0.9;
        }

        const totalModernCost = modernLaborCost + estimatedModernToolSpend;
        const savings = totalLegacyCost - totalModernCost;
        const hoursSaved = (wastedFTEs - modernFTEs) * 2000;

        setResults({
            wastedCost: totalLegacyCost,
            modernCost: totalModernCost,
            savings: savings,
            hoursSaved: Math.round(hoursSaved),
            legacyLabor: legacyLaborCost,
            legacyTools: legacyToolCost,
            modernLabor: modernLaborCost,
            modernTools: estimatedModernToolSpend,
        });
    }, [teamSize, avgSalary, maintenanceLoad, legacySpend]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const formatNumber = (val) => {
        return new Intl.NumberFormat('en-US').format(val);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col lg:flex-row overflow-hidden">

                {/* Input Section */}
                <div className="p-8 lg:p-16 lg:w-1/2 bg-white">
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 tracking-tight mb-2">ROI Calculator</h2>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">Configuration</p>
                    </div>

                    <div className="space-y-12">
                        {/* Team Size */}
                        <div className="group">
                            <div className="flex justify-between mb-4 items-end">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Team Size
                                </label>
                                <span className="text-2xl font-light text-gray-900 font-mono">
                                    {teamSize} <span className="text-sm text-gray-400 font-sans">engineers</span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={teamSize}
                                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-black hover:accent-gray-700 transition-all"
                            />
                        </div>

                        {/* Avg Salary */}
                        <div className="group">
                            <div className="flex justify-between mb-4 items-end">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Avg. Salary
                                </label>
                                <span className="text-2xl font-light text-gray-900 font-mono">
                                    {formatCurrency(avgSalary)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="50000"
                                max="300000"
                                step="5000"
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-black hover:accent-gray-700 transition-all"
                            />
                        </div>

                        {/* Maintenance Load */}
                        <div className="group">
                            <div className="flex justify-between mb-4 items-end">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Maintenance Load
                                </label>
                                <span className="text-2xl font-light text-red-600 font-mono">
                                    {maintenanceLoad}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="90"
                                value={maintenanceLoad}
                                onChange={(e) => setMaintenanceLoad(parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-red-600 hover:accent-red-700 transition-all"
                            />
                            <p className="text-xs text-gray-400 mt-2 font-medium">Percentage of time spent on break/fix vs. innovation.</p>
                        </div>

                        {/* Legacy Spend */}
                        <div className="group">
                            <div className="flex justify-between mb-4 items-end">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Monthly Tool Spend
                                </label>
                            </div>
                            <div className="relative border-b border-gray-200 focus-within:border-black transition-colors">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-light text-xl">$</span>
                                <input
                                    type="number"
                                    value={legacySpend}
                                    onChange={(e) => setLegacySpend(parseInt(e.target.value) || 0)}
                                    className="w-full pl-6 py-2 text-xl font-light font-mono text-gray-900 bg-transparent border-none focus:ring-0 placeholder-gray-300"
                                    placeholder="5000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="p-8 lg:p-16 lg:w-1/2 bg-slate-900 text-white flex flex-col justify-between">

                    <div>
                        <div className="flex justify-between items-start mb-12 border-b border-slate-700 pb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projected Impact</h3>
                            <button
                                onClick={() => setShowBenchmarks(true)}
                                className="text-xs text-slate-400 hover:text-white transition-colors border-b border-slate-600 hover:border-white pb-0.5"
                            >
                                View Benchmarks
                            </button>
                        </div>

                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-slate-400 text-sm mb-2 font-medium">Estimated Annual Savings</p>
                                <div className="text-5xl sm:text-6xl font-light text-white tracking-tight font-mono">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={results.savings}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            {formatCurrency(results.savings)}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Hours Reclaimed</p>
                                    <div className="text-3xl font-light text-white font-mono">
                                        {formatNumber(results.hoursSaved)}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Productivity</p>
                                    <div className="text-3xl font-light text-white font-mono">
                                        {((results.hoursSaved / 2000)).toFixed(1)}x <span className="text-lg text-slate-500">FTE</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* See the Math Toggle */}
                            <div className="pt-8 border-t border-slate-800">
                                <button
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                    className="flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors w-full"
                                >
                                    {showBreakdown ? "Hide Breakdown" : "View Cost Analysis"}
                                    {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                <AnimatePresence>
                                    {showBreakdown && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 space-y-4 text-sm font-mono">
                                                <div className="flex justify-between items-end pb-2 border-b border-slate-800">
                                                    <span className="text-slate-400 font-sans text-xs uppercase">Legacy Cost</span>
                                                    <span className="text-red-400">{formatCurrency(results.wastedCost)}</span>
                                                </div>
                                                <div className="flex justify-between items-end pb-2 border-b border-slate-800">
                                                    <span className="text-slate-400 font-sans text-xs uppercase">Modern Cost</span>
                                                    <span className="text-green-400">{formatCurrency(results.modernCost)}</span>
                                                </div>
                                                <div className="flex justify-between items-end pt-2">
                                                    <span className="text-white font-sans text-xs uppercase font-bold">Net Savings</span>
                                                    <span className="text-white">{formatCurrency(results.savings)}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <Link href="/contact" className="group w-full bg-white hover:bg-gray-100 text-black font-medium py-4 px-6 transition-all flex items-center justify-between">
                            <span>Book an Audit</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Pricing Benchmarks Modal */}
            <AnimatePresence>
                {showBenchmarks && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={() => setShowBenchmarks(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-light text-gray-900 uppercase tracking-widest">Pricing Benchmarks</h3>
                                <button onClick={() => setShowBenchmarks(false)} className="text-gray-400 hover:text-black transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Legacy */}
                                    <div>
                                        <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-6">Legacy Stack</h4>
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">License (Enterprise)</span>
                                                <span className="font-mono text-gray-900">$50k - $200k/yr</span>
                                            </li>
                                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Infrastructure</span>
                                                <span className="font-mono text-gray-900">Dedicated</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Modern */}
                                    <div>
                                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-6">Modern Stack</h4>
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Snowflake</span>
                                                <span className="font-mono text-gray-900">~$3.00 / credit</span>
                                            </li>
                                            <li className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">dbt Cloud</span>
                                                <span className="font-mono text-gray-900">$100 / user</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest text-center">
                                    Sources: Gartner, Snowflake Pricing, dbt Labs (2024)
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
