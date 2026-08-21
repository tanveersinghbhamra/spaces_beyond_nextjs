export default function Review({ content }) {
    const r = content.review;

    return (
        <section className="review-section" id="review" aria-labelledby="review-h">
            <img
                className="review-section__bg"
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=70"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />
            <div className="review-section__overlay" aria-hidden="true"></div>

            <div className="review__grid">
                <div className="review__photo-col">
                    <div className="review__photo-card review__logo-card">
                        <div className="review__badge">
                            <span className="review__badge-rating">4.9</span>
                            <div className="review__badge-stars" aria-hidden="true">★★★★★</div>
                            <span className="review__badge-count">150+ Verified Reviews</span>
                        </div>
                        <div className="review__logo-mark">
                            <span className="review__logo-word">Spaces</span>
                            <span className="review__logo-amp">&amp;</span>
                            <span className="review__logo-word">Beyond</span>
                            <span className="review__logo-sub">Real Estate</span>
                        </div>
                    </div>
                </div>

                <div className="review__right-col">
                    <div className="review__header">
                        <p className="review__label">Leave a Review</p>
                        <h2 className="review__heading" id="review-h">
                            Thank You<br />For Your <em>Trust.</em>
                        </h2>
                        <p className="review__sub">{r.sub}</p>
                    </div>

                    <a href={r.link_href} target="_blank" rel="noopener" className="review__pf-cta">
                        <svg className="review__pf-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <rect width="28" height="28" rx="6" fill="#1D1D1B" />
                            <path d="M14 5 L20 9 L20 18 L14 22 L8 18 L8 9 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                            <circle cx="14" cy="16" r="3" fill="#E8334A" />
                            <path d="M14 5 L14 13" stroke="#FFFFFF" strokeWidth="1.2" />
                        </svg>
                        <div className="review__pf-text">
                            <span className="review__pf-label">{r.stars_label}</span>
                            <span className="review__pf-name">Leave a Review on Property Finder</span>
                        </div>
                        <span className="review__pf-cta-btn">
                            Click to Review
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </span>
                    </a>
                    <p className="review__pf-hint">Opens Property Finder in a new tab — takes less than a minute.</p>
                </div>
            </div>
        </section>
    );
}