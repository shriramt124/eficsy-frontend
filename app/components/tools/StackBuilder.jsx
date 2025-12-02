"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Zap, Users, X, Check, ArrowRight, Trash2, Layers, Database, BarChart3, Box, Cpu } from "lucide-react";
import ToolIcon from "./StackBuilder/ToolIcon";

// --- TOOL DATA LIBRARY ---
const TOOLS = {
    ingestion: [
        { id: "fivetran", name: "Fivetran", type: "SaaS", cost: "High", complexity: "Low", desc: "Automated connectors." },
        { id: "airbyte", name: "Airbyte", type: "Hybrid", cost: "Med", complexity: "Med", desc: "Open-source standard." },
        { id: "custom", name: "Custom Python", type: "Self-Hosted", cost: "Low", complexity: "High", desc: "Maximum control." },
    ],
    warehouse: [
        { id: "snowflake", name: "Snowflake", type: "SaaS", cost: "Usage", complexity: "Low", desc: "Infinite scale." },
        { id: "bigquery", name: "BigQuery", type: "Serverless", cost: "Usage", complexity: "Low", desc: "Serverless powerhouse." },
        { id: "postgres", name: "Postgres", type: "Self-Hosted", cost: "Fixed", complexity: "Med", desc: "Reliable OLTP." },
    ],
    transformation: [
        { id: "dbt-cloud", name: "dbt Cloud", type: "SaaS", cost: "Med", complexity: "Low", desc: "Managed IDE." },
        { id: "dbt-core", name: "dbt Core", type: "Self-Hosted", cost: "Free", complexity: "High", desc: "CLI version." },
        { id: "coalesce", name: "Coalesce", type: "SaaS", cost: "Med", complexity: "Low", desc: "GUI-first." },
    ],
    bi: [
        { id: "looker", name: "Looker", type: "SaaS", cost: "High", complexity: "Med", desc: "Governance-first." },
        { id: "tableau", name: "Tableau", type: "Hybrid", cost: "Med", complexity: "Med", desc: "Visual analytics." },
        { id: "metabase", name: "Metabase", type: "Self-Hosted", cost: "Low", complexity: "Low", desc: "Simple BI." },
    ],
};

export default function StackBuilder() {
    // State
    const [stack, setStack] = useState({
        ingestion: null,
        warehouse: null,
        transformation: null,
        bi: null,
    });
    const [dataVolume, setDataVolume] = useState("small");
    const [draggedItem, setDraggedItem] = useState(null);
    const [activeCategory, setActiveCategory] = useState("ingestion");

    // Layout State
    const [isLeftOpen, setIsLeftOpen] = useState(true);
    const [isRightOpen, setIsRightOpen] = useState(true);

    // Logic: Calculate Score
    const calculateStats = () => {
        let complexity = 0;
        let cost = 0;
        let maintenance = 0;

        Object.values(stack).forEach(tool => {
            if (!tool) return;
            if (tool.complexity === "High") { complexity += 3; maintenance += 3; }
            if (tool.complexity === "Med") { complexity += 2; maintenance += 2; }
            if (tool.complexity === "Low") { complexity += 1; maintenance += 1; }

            if (tool.cost === "High") cost += 3;
            if (tool.cost === "Med") cost += 2;
            if (tool.cost === "Low") cost += 1;
        });

        return { complexity, cost, maintenance };
    };

    const stats = calculateStats();

    // Logic: Stress Test
    const runStressTest = () => {
        const warnings = [];
        if (dataVolume === "massive") {
            if (stack.warehouse?.id === "postgres") {
                warnings.push({ title: "Bottleneck Risk", msg: "Postgres struggles >1TB." });
            }
            if (stack.ingestion?.id === "custom") {
                warnings.push({ title: "Maint. Risk", msg: "Custom scripts at scale." });
            }
        }
        if (stack.transformation?.id === "dbt-core") {
            warnings.push({ title: "Orchestration", msg: "Needs Airflow." });
        }
        return warnings;
    };

    const warnings = runStressTest();

    // Logic: Hiring Plan
    const getHiringPlan = () => {
        const roles = [];
        if (stats.maintenance > 6) roles.push("Data Engineer (Sr)");
        if (stack.transformation) roles.push("Analytics Engineer");
        if (stack.bi?.id === "looker") roles.push("BI Developer");
        if (roles.length === 0) roles.push("Data Generalist");
        return [...new Set(roles)];
    };

    // Drag Handlers
    const handleDragStart = (tool, category) => {
        setDraggedItem({ ...tool, category });
    };

    const handleDrop = (category) => {
        if (draggedItem && draggedItem.category === category) {
            setStack(prev => ({ ...prev, [category]: draggedItem }));
            setDraggedItem(null);
        }
    };

    return (
        <div className="relative w-full h-screen bg-neutral-950 text-white font-sans overflow-hidden selection:bg-green-500/30">

            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
                {/* Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
            </div>

            {/* --- HEADER (Floating) --- */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-6 shadow-2xl">
                    <div className="flex items-center gap-2">
                        <Layers size={14} className="text-green-500" />
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Stack Builder</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex gap-1">
                        {["small", "medium", "massive"].map(v => (
                            <button
                                key={v}
                                onClick={() => setDataVolume(v)}
                                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all ${dataVolume === v ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <button
                        onClick={() => setStack({ ingestion: null, warehouse: null, transformation: null, bi: null })}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* --- LEFT SIDEBAR (Floating Glass) --- */}
            <AnimatePresence>
                {isLeftOpen && (
                    <motion.div
                        initial={{ x: -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -320, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-6 bottom-6 left-6 w-80 z-30 flex flex-col"
                    >
                        <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                            {/* Header */}
                            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Box size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
                                </div>
                                <button onClick={() => setIsLeftOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="p-4 flex flex-wrap gap-2">
                                {Object.keys(TOOLS).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                            ? "bg-white text-black border-white shadow-lg"
                                            : "bg-transparent text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Tool List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {TOOLS[activeCategory].map(tool => (
                                    <motion.div
                                        key={tool.id}
                                        drag
                                        dragSnapToOrigin
                                        whileDrag={{ scale: 1.05, zIndex: 100, cursor: "grabbing" }}
                                        onDragStart={() => handleDragStart(tool, activeCategory)}
                                        onDragEnd={() => setDraggedItem(null)}
                                        className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing"
                                    >
                                        <div className="flex justify-between items-start mb-2 pointer-events-none">
                                            <ToolIcon id={tool.id} className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                                            <span className="text-[9px] font-mono text-gray-600 uppercase border border-white/5 px-1.5 py-0.5 rounded bg-black/20">
                                                {tool.type}
                                            </span>
                                        </div>
                                        <div className="font-bold text-sm text-gray-200 group-hover:text-white pointer-events-none">{tool.name}</div>
                                        <div className="text-[10px] text-gray-500 mt-1 pointer-events-none">{tool.desc}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Left Button (When Closed) */}
            {!isLeftOpen && (
                <button
                    onClick={() => setIsLeftOpen(true)}
                    className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/40 backdrop-blur border-y border-r border-white/10 p-2 rounded-r-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                    <Box size={16} />
                </button>
            )}

            {/* --- CENTER CANVAS --- */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-auto p-20">

                {/* Connecting Lines (SVG) */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-20 pointer-events-none opacity-40 z-0">
                    <line x1="15%" y1="50%" x2="38%" y2="50%" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="38%" y1="50%" x2="62%" y2="50%" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="62%" y1="50%" x2="85%" y2="50%" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 4" />

                    <defs>
                        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                        </linearGradient>
                    </defs>

                    {/* Arrowheads */}
                    <circle cx="38%" cy="50%" r="2" fill="white" />
                    <circle cx="62%" cy="50%" r="2" fill="white" />
                    <circle cx="85%" cy="50%" r="2" fill="white" />
                </svg>

                <div className="flex gap-12 relative z-10">
                    {["ingestion", "warehouse", "transformation", "bi"].map((cat, idx) => (
                        <div key={cat} className="relative group">
                            {/* Step Label */}
                            <div className="absolute -top-12 left-0 w-full text-center">
                                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">0{idx + 1}</span>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{cat}</div>
                            </div>

                            <motion.div
                                onMouseUp={() => handleDrop(cat)}
                                animate={{
                                    borderColor: draggedItem?.category === cat ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                                    backgroundColor: draggedItem?.category === cat ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)"
                                }}
                                className="w-48 h-64 border border-dashed border-white/10 rounded-2xl flex items-center justify-center relative transition-all duration-300 backdrop-blur-sm"
                            >
                                {stack[cat] ? (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-full h-full bg-black/80 border border-white/20 p-5 rounded-2xl flex flex-col justify-between relative group shadow-2xl backdrop-blur-md"
                                    >
                                        <button
                                            onClick={() => setStack(prev => ({ ...prev, [cat]: null }))}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>

                                        <div className="mt-2 text-center">
                                            <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                                                <ToolIcon id={stack[cat].id} className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="font-bold text-sm text-white leading-tight">{stack[cat].name}</div>
                                            <div className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">{stack[cat].type}</div>
                                        </div>

                                        {/* Warning Badge */}
                                        {dataVolume === "massive" && stack[cat].id === "postgres" && (
                                            <div className="mt-2 flex items-center justify-center gap-1.5 text-[9px] text-red-400 font-bold bg-red-900/20 py-1 px-2 rounded-full border border-red-900/30">
                                                <AlertTriangle size={10} /> Bottleneck
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-700 pointer-events-none">
                                        <div className="w-8 h-8 rounded-full border border-dashed border-gray-700 flex items-center justify-center">
                                            <span className="text-xs">+</span>
                                        </div>
                                        <span className="text-[9px] font-mono uppercase tracking-widest">Drop</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT SIDEBAR (Floating Glass) --- */}
            <AnimatePresence>
                {isRightOpen && (
                    <motion.div
                        initial={{ x: 320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 320, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-6 bottom-6 right-6 w-72 z-30 flex flex-col"
                    >
                        <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                            {/* Header */}
                            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <BarChart3 size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Analysis</span>
                                </div>
                                <button onClick={() => setIsRightOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg">
                                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Complexity</span>
                                        <span className={`font-mono text-sm font-bold ${stats.complexity > 6 ? "text-red-400" : "text-green-400"}`}>
                                            {stats.complexity > 6 ? "HIGH" : stats.complexity > 3 ? "MED" : "LOW"}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-3 rounded-lg">
                                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Est. Cost</span>
                                        <span className="font-mono text-sm font-bold text-white">
                                            {stats.cost > 6 ? "$$$" : stats.cost > 3 ? "$$" : "$"}
                                        </span>
                                    </div>
                                </div>

                                {/* Warnings */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Zap size={12} className={warnings.length > 0 ? "text-red-500" : "text-gray-600"} />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stress Test</span>
                                    </div>

                                    {warnings.length > 0 ? (
                                        <div className="space-y-2">
                                            {warnings.map((w, i) => (
                                                <div key={i} className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                                                    <div className="text-red-400 text-[10px] font-bold mb-0.5 flex items-center gap-1.5">
                                                        <AlertTriangle size={10} /> {w.title}
                                                    </div>
                                                    <p className="text-red-400/70 text-[9px] leading-relaxed">{w.msg}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-[10px] text-gray-600 font-mono italic p-3 border border-dashed border-white/5 rounded-lg text-center">
                                            System stable. No critical bottlenecks detected.
                                        </div>
                                    )}
                                </div>

                                {/* Hiring Plan */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Users size={12} className="text-blue-500" />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Team Req.</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {getHiringPlan().map((role, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[10px] text-gray-300 bg-white/5 p-2 rounded border border-white/5">
                                                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <Check size={8} className="text-blue-400" />
                                                </div>
                                                {role}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="p-4 bg-white border-t border-white/10">
                                <button className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-neutral-800 transition-colors text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
                                    Export Blueprint <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Right Button (When Closed) */}
            {!isRightOpen && (
                <button
                    onClick={() => setIsRightOpen(true)}
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/40 backdrop-blur border-y border-l border-white/10 p-2 rounded-l-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                    <BarChart3 size={16} />
                </button>
            )}

        </div>
    );
}
