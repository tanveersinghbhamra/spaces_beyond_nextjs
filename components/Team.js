"use client";

export default function Team({ content }) {
    return (
        <section className="team-v2" id="team" aria-labelledby="team-title">
            <div className="section-header">
                <p className="eyebrow">Leadership</p>
                <h2 className="section-title" id="team-title">
                    Meet the <em>Partners</em>
                </h2>
            </div>

            <div className="team-v2__list">
                {content.team.map((m, i) => {
                    const reversed = i % 2 === 1;
                    const fullName = m.name_line2
                        ? `${m.name_line1} ${m.name_line2}`
                        : m.name_line1;
                    return (
                        <article
                            key={m.id || i}
                            className={`team-v2__row${reversed ? " is-reversed" : ""}`}
                        >
                            <div className="team-v2__copy">
                                <p className="team-v2__eyebrow">{m.role}</p>
                                <h3 className="team-v2__headline">
                                    {fullName}
                                </h3>
                                <p className="team-v2__bio">
                                    <span
                                        className="team-v2__quote-mark"
                                        aria-hidden="true"
                                    >
                                        &ldquo;
                                    </span>
                                    {m.bio}
                                    <span
                                        className="team-v2__quote-mark team-v2__quote-mark--close"
                                        aria-hidden="true"
                                    >
                                        &rdquo;
                                    </span>
                                </p>

                                {m.languages?.length > 0 && (
                                    <div className="team-v2__langs">
                                        {m.languages.map((l) => (
                                            <span key={l} className="lang-tag">
                                                {l}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="team-v2__photo-wrap">
                                <img
                                    className="team-v2__photo"
                                    src={m.photo}
                                    alt={`${m.role}, Spaces and Beyond`}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        e.currentTarget.style.opacity = "0";
                                    }}
                                />
                                {m.cred_value && (
                                    <div className="team-v2__stat">
                                        <p className="team-v2__stat-label">
                                            {m.cred_label}
                                        </p>
                                        <p className="team-v2__stat-value">
                                            {m.cred_value}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
