const footerLinks = {
  navigate: [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
  ],
  connect: [
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Twitter", href: "#" },
  ],
  contact: [
    { name: "Email", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Khalid Khan</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
              {footerLinks.navigate.map((link) => (
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

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
              {footerLinks.connect.map((link) => (
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

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
              {footerLinks.contact.map((link) => (
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
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-muted-foreground)]">
          <p>© {new Date().getFullYear()} Khalid Khan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

