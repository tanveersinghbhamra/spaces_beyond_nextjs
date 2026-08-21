export default function Cta({ content }) {
    const cta = content.cta;
    return (
        <section className="cta-section" aria-labelledby="cta-title">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
                {cta.eyebrow}
            </p>
            <h2 className="section-title cta-section__title" id="cta-title">
                Your Next Chapter
                <br />
                Starts <em>Here.</em>
            </h2>
            <div className="cta-section__line"></div>
            <p className="cta-section__sub">{cta.sub}</p>
            <div className="cta-section__actions">
                <a href="#contact" className="btn btn--primary">
                    <span>Book a Consultation</span>
                </a>
                <a
                    href={content.contact.whatsapp_href}
                    className="btn btn--outline"
                    target="_blank"
                    rel="noopener"
                >
                    WhatsApp Us Now
                </a>
            </div>
        </section>
    );
}
