import { getContent } from '../lib/getContent';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Properties from '../components/Properties';
import Calculators from '../components/Calculators';
import Team from '../components/Team';
import Awards from '../components/Awards';
import Services from '../components/Services';
import TestimonialsReview from '../components/TestimonialsReview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// getContent() runs on the server for every request (with 30s ISR
// caching) — this is what keeps the whole page always fresh with no
// stale-content gap, and no client-side injection needed anywhere.
export default async function HomePage() {
    const content = await getContent();

    return (
        <>
            <Navbar content={content} />
            <main>
                <Hero content={content} />
                <About content={content} />
                <Properties content={content} />
                <Services content={content} />
                <Calculators />
                <Team content={content} />
                <Awards content={content} />
                <TestimonialsReview content={content} />
                <Contact content={content} />
            </main>
            <Footer content={content} />
        </>
    );
}