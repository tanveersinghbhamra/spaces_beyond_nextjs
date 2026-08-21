export default function About({ content }) {
    const a = content.about;
    return (
        <section className="section" id="about" aria-labelledby="about-title">
            <div className="about__centered">
                <h2 className="about__centered-title" id="about-title">
                    {a.title} <em>{a.title_em}</em>
                    <br />
                    {a.title2}
                </h2>
                <p className="about__centered-p">{a.p1}</p>
                <p className="about__centered-p">{a.p2}</p>
                <div className="about__centered-features">
                    <span>Trust &amp; Transparency</span>
                    <span>Global Reach</span>
                    <span>Investment Strategy</span>
                    <span>Client-First</span>
                </div>
            </div>
        </section>
    );
}
