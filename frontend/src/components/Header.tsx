"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

// Custom Sun Icon for Day Mode
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

// Custom Moon Icon for Night Mode
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      {/* Stars */}
      <circle cx="18" cy="5" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="9" r="0.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export default function Header({
  onThemeChange,
}: {
  onThemeChange?: (isNight: boolean) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeNight = savedTheme === "night" || (!savedTheme && prefersDark);

    setIsNight(shouldBeNight);
    if (shouldBeNight) {
      document.documentElement.classList.add("dark");
    }
    onThemeChange?.(shouldBeNight);
  }, [onThemeChange]);

  const toggleTheme = useCallback(() => {
    const newTheme = !isNight;
    setIsNight(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "night");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "day");
    }
    onThemeChange?.(newTheme);
  }, [isNight, onThemeChange]);

  return (
    <header className="sticky top-0 z-50 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 pill-nav px-4 sm:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-primary-foreground)] font-bold text-base sm:text-lg">
                {SITE_CONFIG.name.charAt(0)}
              </span>
            </div>
            <span className="text-base sm:text-xl font-bold truncate">
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:bg-[var(--color-muted)]/60 rounded-full px-4 py-2 transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full hover:bg-[var(--color-muted)]/60 transition-all group overflow-hidden"
              aria-label={isNight ? "Switch to Day" : "Switch to Night"}
            >
              <div className="relative w-5 h-5">
                {/* Sun Icon (Day Mode) */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isNight
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                >
                  <SunIcon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                {/* Moon Icon (Night Mode) */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isNight
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                >
                  <MoonIcon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 mt-2 pill-nav animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium hover:bg-[var(--color-muted)]/60 rounded-full px-4 py-3 transition-all"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
