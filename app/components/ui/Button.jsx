"use client";

import Link from "next/link";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll create a simple helper or inline it.

// Simple class merger if utils doesn't exist yet
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    href,
    icon,
    ...props
}) {
    // Base styles
    const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 overflow-hidden group";

    // Size styles
    const sizeStyles = {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
    };

    // Rounded styles - always full for premium look
    const roundedStyles = "rounded-full";

    // Variant styles
    const variants = {
        primary: "bg-black text-white hover:scale-105",
        secondary: "bg-white text-black border border-gray-200 hover:border-black hover:scale-105",
        accent: "bg-green-800 text-white hover:scale-105",
        outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
        ghost: "bg-transparent text-black hover:bg-gray-100",
    };

    // Slide animation colors
    const slideColors = {
        primary: "bg-green-800",
        secondary: "bg-black",
        accent: "bg-black",
        outline: "", // No slide for outline usually, or maybe fill
        ghost: "",
    };

    // Icon arrow
    const ArrowIcon = () => (
        <span className="relative z-10 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ↗
        </span>
    );

    const combinedClassName = classNames(
        baseStyles,
        sizeStyles[size],
        roundedStyles,
        variants[variant],
        className
    );

    const content = (
        <>
            {/* Sliding Background Effect - Only for primary, secondary, accent */}
            {(variant === 'primary' || variant === 'secondary' || variant === 'accent') && (
                <span
                    className={classNames(
                        "absolute inset-0 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out",
                        slideColors[variant]
                    )}
                />
            )}

            {/* Text Content */}
            <span className={classNames(
                "relative z-10 flex items-center gap-2",
                variant === 'secondary' ? "group-hover:text-white" : ""
            )}>
                {children}
                {icon && <ArrowIcon />}
            </span>
        </>
    );

    if (href) {
        // External link
        if (href.startsWith('http')) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName} {...props}>
                    {content}
                </a>
            );
        }
        // Internal link
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {content}
        </button>
    );
}
