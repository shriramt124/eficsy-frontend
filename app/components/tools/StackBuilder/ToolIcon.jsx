export default function ToolIcon({ id, className = "w-6 h-6" }) {
    // Simple SVG paths for major tools to look professional
    // In a real app, these would be exact brand assets.
    // Here we use stylized approximations to avoid external image dependencies.

    const icons = {
        snowflake: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        bigquery: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M12 12v6" />
                <path d="M12 12L8 8" />
            </svg>
        ),
        postgres: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12L2.5 15" />
            </svg>
        ),
        "dbt-cloud": (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M4 12l8-4 8 4-8 4-8-4zm0-6l8-4 8 4M4 18l8-4 8 4" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        "dbt-core": (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 12h6" />
            </svg>
        ),
        fivetran: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        airbyte: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
            </svg>
        ),
        looker: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
            </svg>
        ),
        tableau: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
            </svg>
        ),
        custom: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        metabase: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l4 4 4-4" />
            </svg>
        ),
        coalesce: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        )
    };

    return icons[id] || <div className="w-6 h-6 bg-gray-500 rounded-full" />;
}
