"use client";

import { useState } from "react";

const SPEC_ICONS = {
    bed: (
        <>
            <path d="M2 17h20" />
            <path d="M4 17v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
            <path d="M4 13V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" />
            <path d="M2 21v-2" />
            <path d="M22 21v-2" />
        </>
    ),
    bath: (
        <>
            <path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2Z" />
            <path d="M3 12V6a2 2 0 0 1 2-2c1 0 1.5.6 1.5 1.5" />
            <path d="M6 19v2" />
            <path d="M16 19v2" />
        </>
    ),
    size: (
        <>
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
        </>
    ),
};

function SpecIcon({ name }) {
    return (
        <svg
            className="prop-spec__icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {SPEC_ICONS[name]}
        </svg>
    );
}

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=60";

export default function PropertyCard({ property, priority }) {
    const images = (
        Array.isArray(property.images) && property.images.length
            ? property.images
            : [property.image]
    ).filter(Boolean);
    const hasMultiple = images.length > 1;
    const [index, setIndex] = useState(0);
    const [startX, setStartX] = useState(null);

    const go = (i) => setIndex((i + images.length) % images.length);

    const onTouchStart = (e) => setStartX(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (startX === null) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(index + (diff > 0 ? 1 : -1));
        setStartX(null);
    };

    return (
        <article
            className="prop-card reveal is-visible"
            data-type={property.type}
        >
            <div
                className="prop-card__media"
                onTouchStart={hasMultiple ? onTouchStart : undefined}
                onTouchEnd={hasMultiple ? onTouchEnd : undefined}
            >
                <div
                    className="prop-card__track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img.startsWith("http") ? img : `/${img}`}
                            alt={`${property.name}: photo ${i + 1}`}
                            loading={priority && i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMG;
                            }}
                        />
                    ))}
                </div>

                {hasMultiple && (
                    <>
                        <button
                            type="button"
                            className="prop-card__nav prop-card__nav--prev"
                            aria-label="Previous photo"
                            onClick={() => go(index - 1)}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="prop-card__nav prop-card__nav--next"
                            aria-label="Next photo"
                            onClick={() => go(index + 1)}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                        <div className="prop-card__dots">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    className={`prop-card__dot${i === index ? " is-active" : ""}`}
                                    onClick={() => go(i)}
                                />
                            ))}
                        </div>
                    </>
                )}

                <span className="prop-card__badge">{property.badge}</span>
            </div>

            <div className="prop-card__body">
                <p className="prop-card__location">
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.location}
                </p>
                <h3 className="prop-card__name">{property.name}</h3>
                <div className="prop-card__specs">
                    <span className="prop-spec">
                        <SpecIcon name="bed" />
                        {property.beds} Bed{property.beds == 1 ? "" : "s"}
                    </span>
                    <span className="prop-spec">
                        <SpecIcon name="bath" />
                        {property.baths} Bath{property.baths == 1 ? "" : "s"}
                    </span>
                    <span className="prop-spec">
                        <SpecIcon name="size" />
                        {property.size}
                    </span>
                </div>
                <div className="prop-card__footer">
                    <div className="prop-card__price">
                        {property.price} <span>Starting Price</span>
                    </div>
                    <a href="#contact" className="btn btn--outline-gold">
                        Enquire
                    </a>
                </div>
            </div>
        </article>
    );
}
