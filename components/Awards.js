export default function Awards({ content }) {
    const aw = content.awards;
    return (
        <section
            className="section awards-v1"
            id="awards"
            aria-labelledby="awards-title"
        >
            <div className="section-header">
                <p className="eyebrow">Recognition</p>
                <h2 className="section-title" id="awards-title">
                    Awards & <em>Recognition</em>
                </h2>
                <p className="awards-v1__lead">{aw.lead}</p>
            </div>

            <div className="awards-v1__layout">
                <div className="awards-v1__col">
                    <div className="awards-v1__item awards-v1__item--lg">
                        <span className="awards-v1__index">01</span>
                        <img
                            src={
                                aw.award1_img?.startsWith("http")
                                    ? aw.award1_img
                                    : `/${aw.award1_img}`
                            }
                            alt={`${aw.award1_caption} — Spaces & Beyond Real Estate`}
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="awards-v1__caption">
                            {aw.award1_caption}
                        </span>
                    </div>
                </div>
                <div className="awards-v1__col awards-v1__col--offset">
                    <div className="awards-v1__item awards-v1__item--lg">
                        <span className="awards-v1__index">02</span>
                        <img
                            src={
                                aw.award2_img?.startsWith("http")
                                    ? aw.award2_img
                                    : `/${aw.award2_img}`
                            }
                            alt={`${aw.award2_caption} — Spaces & Beyond Real Estate`}
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="awards-v1__caption">
                            {aw.award2_caption}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
