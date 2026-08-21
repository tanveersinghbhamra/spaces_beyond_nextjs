'use client';

import { useState } from 'react';
import SkylinePattern from './SkylinePattern';

export default function TestimonialsReview({ content }) {
    const [active, setActive] = useState(0);
    const testis = content.testimonials;
    const current = testis[active];
    const r = content.review;

    return (
        <section className="tr-section" id="testimonials" aria-labelledby="tr-title">
            <SkylinePattern />
            <div className="tr-section__inner">
                <p className="tr-section__eyebrow">Client Stories</p>
                <h2 className="tr-section__heading" id="tr-title">
                    Voices of <em>Trust</em>
                </h2>

                <div className="tr-section__quote-wrap">
                    <span className="tr-section__quote-mark" aria-hidden="true">&ldquo;</span>
                    <p className="tr-section__quote">{current.text}</p>
                    <p className="tr-section__attribution">
                        {current.name} <span>&middot; {current.from}</span>
                    </p>
                </div>

                <div className="tr-section__dots" role="tablist" aria-label="Choose a testimonial">
                    {testis.map((t, i) => (
                        <button
                            key={t.id || i}
                            type="button"
                            className={`tr-section__dot${i === active ? ' is-active' : ''}`}
                            aria-label={`Show testimonial from ${t.name}`}
                            aria-selected={i === active}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>

                <div className="tr-section__divider" aria-hidden="true"></div>

                <div className="tr-section__closing">
                    <div className="tr-section__rating">
                        <span className="tr-section__rating-stars" aria-hidden="true">★★★★★</span>
                        <span className="tr-section__rating-text"><strong>4.9</strong> from <strong>150+</strong> verified clients</span>
                    </div>
                    <a href={r.link_href} target="_blank" rel="noopener" className="tr-section__cta">
                        Had a great experience? Leave us a review
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}