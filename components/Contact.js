'use client';

import { useState } from 'react';

export default function Contact({ content }) {
    const c = content.contact;
    const [status, setStatus] = useState('idle');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' });

    const submit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const r = await fetch('/api/odoo-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, source: 'Contact form' })
            });
            const data = await r.json().catch(() => ({}));

            if (data.fallback === 'whatsapp') {
                const lines = [
                    `New enquiry from spacesandbeyond.ae`,
                    `Name: ${form.firstName} ${form.lastName}`.trim(),
                    form.email && `Email: ${form.email}`,
                    form.phone && `Phone: ${form.phone}`,
                    form.interest && `Interested in: ${form.interest}`,
                    form.message && `Message: ${form.message}`,
                ].filter(Boolean).join('\n');
                const waUrl = `https://wa.me/971509515827?text=${encodeURIComponent(lines)}`;
                // Set status BEFORE redirecting — window.location.href
                // doesn't reliably unload the page (especially on mobile,
                // where WhatsApp opens as a separate app and this tab
                // just sits in the background). If we waited until after
                // the redirect to update state, coming back to this tab
                // without finishing in WhatsApp would leave the button
                // stuck on "Sending…" forever.
                setStatus('sent');
                window.open(waUrl, '_blank');
                return;
            }

            if (!r.ok) throw new Error(data.error || 'Submission failed');

            setStatus('sent');
            setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' });
        } catch (err) {
            console.error('[contact form]', err.message);
            setStatus('error');
        }
    };

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    return (
        <section className="contact-v2" id="contact" aria-labelledby="contact-title">
            <div className="contact-v2__left">
                <p className="eyebrow">Get in Touch</p>
                <h2 className="contact-v2__title" id="contact-title">
                    Let&apos;s start a<br /><em>conversation</em>
                </h2>
                <p className="contact-v2__lead">
                    Ready to buy, sell, or invest? Share a few details and we&apos;ll be in touch within 24 hours to arrange your complimentary consultation.
                </p>

                <div className="contact-v2__list">
                    <div className="contact-v2__item">
                        <div className="contact-v2__icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <div>
                            <p className="contact-v2__label">Office</p>
                            <span className="contact-v2__value">{c.address}</span>
                        </div>
                    </div>
                    <div className="contact-v2__item">
                        <div className="contact-v2__icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.15-8.57A2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" /></svg>
                        </div>
                        <div>
                            <p className="contact-v2__label">WhatsApp / Phone</p>
                            <a href={c.whatsapp_href} className="contact-v2__value">{c.phone_display}</a>
                        </div>
                    </div>
                    <div className="contact-v2__item">
                        <div className="contact-v2__icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </div>
                        <div>
                            <p className="contact-v2__label">Email</p>
                            <a href={`mailto:${c.email}`} className="contact-v2__value">{c.email}</a>
                        </div>
                    </div>
                    <div className="contact-v2__item">
                        <div className="contact-v2__icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </div>
                        <div>
                            <p className="contact-v2__label">Instagram</p>
                            <a href={c.instagram_url} target="_blank" rel="noopener" className="contact-v2__value">{c.instagram_handle}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-v2__right">
                <form className="contact-v2__form" onSubmit={submit}>
                    <p className="contact-v2__form-eyebrow">Send a Message</p>

                    <div className="contact-v2__row">
                        <div className="contact-v2__field">
                            <label>First Name</label>
                            <input value={form.firstName} onChange={set('firstName')} placeholder="John" required />
                        </div>
                        <div className="contact-v2__field">
                            <label>Last Name</label>
                            <input value={form.lastName} onChange={set('lastName')} placeholder="Smith" required />
                        </div>
                    </div>

                    <div className="contact-v2__field">
                        <label>Email Address</label>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" required />
                    </div>

                    <div className="contact-v2__field">
                        <label>Phone / WhatsApp</label>
                        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+971 XX XXX XXXX" />
                    </div>

                    <div className="contact-v2__field">
                        <label>I&apos;m Interested In</label>
                        <select value={form.interest} onChange={set('interest')}>
                            <option value="">Select a service…</option>
                            <option value="buying">Buying a Property</option>
                            <option value="selling">Selling a Property</option>
                            <option value="investment">Investment Advisory</option>
                            <option value="offplan">Off-Plan Projects</option>
                            <option value="portfolio">Portfolio Review</option>
                        </select>
                    </div>

                    <div className="contact-v2__field">
                        <label>Message</label>
                        <textarea value={form.message} onChange={set('message')} placeholder="Describe your requirements, timeline…" />
                    </div>

                    <button type="submit" className="contact-v2__submit" disabled={status === 'sending'}>
                        {status === 'sent' ? '✓ Message Sent' : status === 'sending' ? 'Sending…' : status === 'error' ? 'Try Again' : 'Send Message →'}
                    </button>
                    {status === 'error' && (
                        <p className="contact-v2__error">
                            Something went wrong — please try again, or reach us directly on WhatsApp.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}