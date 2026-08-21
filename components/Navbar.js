"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#properties", label: "Properties" },
    { href: "#calculators", label: "Calculators" },
    { href: "#team", label: "Team" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar({ content }) {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
    }, [drawerOpen]);

    return (
        <header>
            <div className="navbar__utility">
                <div className="navbar__utility-inner">
                    <div className="navbar__utility-contacts">
                        <a
                            href={`tel:${content.contact.phone_href.replace("https://wa.me/", "+")}`}
                            className="navbar__utility-link"
                            aria-label="Call us"
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>{content.contact.phone_display}</span>
                        </a>
                        <a
                            href={content.contact.whatsapp_href}
                            className="navbar__utility-link"
                            target="_blank"
                            rel="noopener"
                            aria-label="WhatsApp us"
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.94 7.94 0 0 1-4.06-1.11l-.29-.17-3.02.79.8-2.94-.19-.3A7.93 7.93 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            <span>WhatsApp</span>
                        </a>
                        <a
                            href={`mailto:${content.contact.email}`}
                            className="navbar__utility-link"
                            aria-label="Email us"
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>{content.contact.email}</span>
                        </a>
                    </div>
                    <p className="navbar__utility-tagline">
                        {content.navbar.tagline}
                    </p>
                </div>
            </div>

            <nav className={`navbar${scrolled ? " is-scrolled" : ""}`}>
                <div className="navbar__main">
                    <a
                        href="#home"
                        className="navbar__logo"
                        aria-label="Spaces & Beyond Home"
                    >
                        Spaces & Beyond
                        <span>Real Estate</span>
                    </a>

                    <a
                        href={content.contact.whatsapp_href}
                        className="navbar__cta"
                        target="_blank"
                        rel="noopener"
                    >
                        WhatsApp Us
                    </a>

                    <button
                        className={`navbar__hamburger${drawerOpen ? " is-open" : ""}`}
                        aria-label="Toggle menu"
                        aria-expanded={drawerOpen}
                        onClick={() => setDrawerOpen((o) => !o)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className="navbar__linksrow">
                    <ul className="navbar__links" role="list">
                        {NAV_LINKS.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} className="navbar__link">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div
                className={`navbar__drawer${drawerOpen ? " is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                {NAV_LINKS.filter((l) => l.href !== "#contact").map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        className="navbar__drawer-link"
                        onClick={() => setDrawerOpen(false)}
                    >
                        {l.label}
                    </a>
                ))}
                <a
                    href={content.contact.whatsapp_href}
                    className="btn btn--primary navbar__drawer-cta"
                    target="_blank"
                    rel="noopener"
                    onClick={() => setDrawerOpen(false)}
                >
                    <span>WhatsApp Us</span>
                </a>
            </div>
        </header>
    );
}
