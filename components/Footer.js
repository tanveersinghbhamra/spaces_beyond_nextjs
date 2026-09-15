import Link from "next/link";

const NAVIGATE = [
    { href: '#about', label: 'About Us' },
    { href: '#properties', label: 'Properties' },
    { href: '#team', label: 'Our Team' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
];
const SERVICES = ['Residential Sales', 'Commercial Property', 'Investment Advisory', 'Off-Plan Projects', 'Market Research'];

export default function Footer({ content }) {
    const c = content.contact;
    return (
        <footer className="footer">
            <div className="footer__panel">
                <div className="footer__grid">
                    <div>
                        <div className="footer__brand-logo">
                            Spaces And Beyond
                            <span>Real Estate L.L.C</span>
                        </div>
                        <p className="footer__brand-desc">
                            Dubai&apos;s premier luxury real estate brokerage. Precision driven, globally informed, and uncompromising in results.
                        </p>
                    </div>

                    <div>
                        <p className="footer__col-title">Navigate</p>
                        <ul className="footer__links">
                            {NAVIGATE.map((l) => <li key={l.href}><a href={l.href} className="footer__link">{l.label}</a></li>)}
                        </ul>
                    </div>

                    <div>
                        <p className="footer__col-title">Services</p>
                        <ul className="footer__links">
                            {SERVICES.map((s) => <li key={s}><a href="#services" className="footer__link">{s}</a></li>)}
                        </ul>
                    </div>

                    <div>
                        <p className="footer__col-title">Connect</p>
                        <ul className="footer__links">
                            <li><a href={c.instagram_url} target="_blank" rel="noopener" className="footer__link">Instagram</a></li>
                            <li><a href={c.whatsapp_href} target="_blank" rel="noopener" className="footer__link">WhatsApp</a></li>
                            <li><a href={`mailto:${c.email}`} className="footer__link">Email Us</a></li>
                            <li><a href="#contact" className="footer__link">Book Consultation</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__bottom-row">
                        <p className="footer__copy">© 2026 Spaces And Beyond Real Estate L.L.C. All rights reserved. Dubai, UAE.</p>
                        <div className="footer__legal-links">
                            <Link href="/terms" className="footer__legal-link">Terms & Conditions</Link>
                            <span className="footer__legal-sep">·</span>
                            <Link href="/privacy" className="footer__legal-link">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="footer__socials">
                        <a href={c.instagram_url} target="_blank" rel="noopener" className="footer__social" aria-label="Instagram">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </a>
                        <a href={c.whatsapp_href} target="_blank" rel="noopener" className="footer__social" aria-label="WhatsApp">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            <a href={c.whatsapp_href} className="wa-float__btn wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
            </a>
        </footer>
    );
}