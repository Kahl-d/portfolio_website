// Navigation items used in Header and Footer
export const NAV_ITEMS = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
] as const;

// Social links - update these with your actual URLs
export const SOCIAL_LINKS = {
    github: "#",
    linkedin: "#",
    twitter: "#",
    email: "mailto:hello@example.com",
} as const;

// Site metadata
export const SITE_CONFIG = {
    name: "Khalid Khan",
    title: "Khalid Khan | Portfolio",
    description: "Personal portfolio of Khalid Khan",
    tagline: "Building digital experiences with passion and precision.",
} as const;
