"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ToolsNotification() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasDismissed = localStorage.getItem("roi_calc_dismissed");
        if (!hasDismissed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("roi_calc_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
                >
                    <div className="bg-white border border-gray-200 p-6 shadow-2xl relative">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={14} />
                        </button>

                        <div className="pr-6">
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-2">
                                New Tool
                            </span>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                                Calculate your data stack ROI
                            </h4>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                See how much budget you're burning on legacy maintenance.
                            </p>

                            <Link
                                href="/tools/roi-calculator"
                                className="inline-flex items-center text-xs font-bold text-black border-b border-black pb-0.5 hover:text-green-600 hover:border-green-600 transition-colors"
                            >
                                Launch Calculator <ArrowRight size={12} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
