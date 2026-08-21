const DIAMONDS = [
    { num: "22+", label: "Years", dir: "is-up" },
    { num: "8", label: "Service Lines", dir: "is-down" },
    { num: "$100M+", label: "Transacted", dir: "is-up" },
    { num: "24/7", label: "Concierge", dir: "is-down" },
];

export default function Services({ content }) {
    const sv = content.services;
    const boxes = [1, 2, 3, 4, 5, 6].map((i) => sv[`box${i}`]);

    return (
        <section
            className="section services-v3"
            id="services"
            aria-labelledby="services-title"
        >
            <div className="services-v3__intro">
                <div className="services-v3__copy">
                    <p className="eyebrow">What We Do</p>
                    <h2 className="section-title" id="services-title">
                        Full-Service <em>Expertise</em>,<br />
                        Start to Finish
                    </h2>
                    <p className="services-v3__lead">{sv.p1}</p>
                    <p className="services-v3__lead">{sv.p2}</p>
                    <a href="#contact" className="btn btn--outline">
                        Start a Conversation
                    </a>
                </div>

                <div className="services-v3__visual">
                    <div className="services-v3__stats" aria-hidden="true">
                        {DIAMONDS.map((d) => (
                            <div
                                key={d.label}
                                className={`services-v3__diamond ${d.dir}`}
                            >
                                <div className="services-v3__diamond-inner">
                                    <span className="services-v3__num">
                                        {d.num}
                                    </span>
                                    <span className="services-v3__label">
                                        {d.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="services-v3__photo">
                        <img
                            src={
                                sv.img?.startsWith("http")
                                    ? sv.img
                                    : `/${sv.img}`
                            }
                            alt="Spaces & Beyond luxury real estate services in Dubai"
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="services-v3__caption">
                            {sv.img_caption}
                        </span>
                    </div>
                </div>
            </div>

            <div className="services-v3__grid">
                {boxes.map((box, i) => (
                    <div key={i} className="services-v3__box">
                        <span className="services-v3__box-num">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="services-v3__box-title">
                            {box.title}
                        </span>
                        <p className="services-v3__box-desc">{box.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
