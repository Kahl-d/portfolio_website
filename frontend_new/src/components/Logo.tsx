"use client";

import { SITE_CONFIG } from "@/lib/constants";

export default function Logo({ onClick }: { onClick?: () => void }) {
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick?.();
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
        >
            {/* Logo icon box */}
            <div
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: "hsl(var(--primary))" }}
            >
                <span
                    className="font-bold text-base md:text-lg tracking-tight"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                >
                    {SITE_CONFIG.name.split(" ").map(n => n.charAt(0)).join("")}
                </span>
            </div>

            {/* Logo text - hidden on small screens */}
            <span
                className="text-base md:text-lg font-semibold hidden sm:block transition-colors duration-300"
                style={{ color: "hsl(var(--foreground))" }}
            >
                {SITE_CONFIG.name}
            </span>
        </a>
    );
}
