export default function Hero({ content }) {
    const h = content.hero;
    return (
        <section className="hero" id="home" aria-label="Hero">
            <div className="hero__screen">
                <img
                    className="hero__bg-image"
                    // src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                    // src="https://images.pexels.com/photos/30445927/pexels-photo-30445927.jpeg"
                    src="https://images.pexels.com/photos/28350364/pexels-photo-28350364.jpeg"
                    // src="https://images.pexels.com/photos/36134182/pexels-photo-36134182.jpeg"
                    alt="Dubai skyline luxury real estate"
                    loading="eager"
                    decoding="async"
                />

                <div className="hero__overlay" aria-hidden="true"></div>
                <div className="hero__grid-overlay" aria-hidden="true"></div>

                <div className="hero__content">
                    <h1 className="hero__title">
                        {h.title}
                        <br />
                        <em>{h.title_em}</em>
                    </h1>

                    <div className="hero__actions">
                        <a href="#properties" className="hero__btn-primary">
                            <span>{h.btn_primary}</span>
                        </a>
                        <a href="#contact" className="hero__btn-secondary liquid-glass">
                            {h.btn_secondary}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}