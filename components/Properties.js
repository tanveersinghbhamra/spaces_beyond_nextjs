"use client";

import { useRef } from "react";
import PropertyCard from "./PropertyCard";

export default function Properties({ content }) {
    const trackRef = useRef(null);

    const scroll = (dir) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector(".prop-card");
        const step = card ? card.getBoundingClientRect().width + 20 : 340;
        track.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section
            className="section properties-section"
            id="properties"
            aria-labelledby="properties-title"
        >
            <div className="section-header">
                <p className="eyebrow reveal is-visible">Portfolio</p>
                <h2
                    className="section-title reveal is-visible"
                    id="properties-title"
                >
                    Featured <em>Properties</em>
                </h2>
            </div>

            <div className="properties-section__carousel">
                <button
                    type="button"
                    className="properties-section__nav properties-section__nav--prev"
                    aria-label="Previous properties"
                    onClick={() => scroll(-1)}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="properties__grid" ref={trackRef}>
                    {content.properties.map((p, i) => (
                        <PropertyCard key={p.id || i} property={p} />
                    ))}
                </div>

                <button
                    type="button"
                    className="properties-section__nav properties-section__nav--next"
                    aria-label="Next properties"
                    onClick={() => scroll(1)}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
