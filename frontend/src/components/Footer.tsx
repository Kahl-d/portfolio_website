import { NAV_ITEMS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

const footerSections = [
  {
    title: "Navigate",
    links: NAV_ITEMS.filter((item) => item.name !== "Contact"),
  },
  {
    title: "Connect",
    links: [
      { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { name: "GitHub", href: SOCIAL_LINKS.github },
      { name: "Twitter", href: SOCIAL_LINKS.twitter },
    ],
  },
  {
    title: "Contact",
    links: [{ name: "Email", href: SOCIAL_LINKS.email }],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16 relative z-10 backdrop-blur-sm bg-[var(--color-card)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Dynamic sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-muted-foreground)]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
