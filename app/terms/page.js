import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getContent } from "../../lib/getContent";

export const metadata = {
    title: "Terms & Conditions | Spaces And Beyond Real Estate L.L.C",
    robots: "index, follow",
};

export const dynamic = "force-dynamic";

export default async function TermsAndConditions() {
    const content = await getContent();
    return (
        <>
            <Navbar content={content} />
            <main
                style={{
                    maxWidth: 780,
                    margin: "0 auto",
                    padding: "160px 24px 100px",
                    fontFamily: "var(--font-body, sans-serif)",
                    lineHeight: 1.8,
                    color: "#222",
                }}
            >
                <h1
                    style={{
                        fontFamily: "var(--font-display, serif)",
                        fontSize: "2.2rem",
                        marginBottom: 8,
                    }}
                >
                    Terms &amp; Conditions
                </h1>
                <p style={{ color: "#777", marginBottom: 40 }}>
                    Last updated: 10th September 2026
                </p>

                <p>
                    These Terms &amp; Conditions govern your use of
                    spacesandbeyond.ae, operated by Spaces And Beyond Real
                    Estate L.L.C. ("we", "us", "our"). By using this Site, you
                    agree to these terms.
                </p>

                <h2 style={{ marginTop: 40 }}>1. About Us</h2>
                <p>
                    Spaces And Beyond Real Estate L.L.C. is a licensed real
                    estate brokerage operating in Dubai, United Arab Emirates.
                    <br />
                    DED Trade License No.: 1392946
                    <br />
                    Registered with the Real Estate Regulatory Agency (RERA)
                    under registration number: 44415
                    <br />
                    Licensed activities: Real Estate Buying &amp; Selling
                    Brokerage, Leasing Property Brokerage Agents
                </p>

                <h2 style={{ marginTop: 40 }}>2. Use of This Site</h2>
                <p>
                    This Site is provided for informational purposes to help you
                    learn about our services and available properties. Property
                    listings, prices, and availability shown on this Site are
                    subject to change without notice and do not constitute a
                    binding offer.
                </p>

                <h2 style={{ marginTop: 40 }}>
                    3. Property Information Accuracy
                </h2>
                <p>
                    While we make reasonable efforts to keep property listings
                    accurate and current, we do not guarantee the completeness
                    or accuracy of any information displayed. Please confirm all
                    details directly with us before making any decisions.
                </p>

                <h2 style={{ marginTop: 40 }}>4. Calculators &amp; Tools</h2>
                <p>
                    Mortgage, payment, and rental yield calculators on this Site
                    are provided for general estimation purposes only and do not
                    constitute financial advice. Actual rates, fees, and figures
                    may vary — please consult with a licensed financial advisor
                    or bank for exact figures.
                </p>

                <h2 style={{ marginTop: 40 }}>
                    5. Enquiries &amp; Communication
                </h2>
                <p>
                    By submitting an enquiry through this Site (including via
                    our contact form, calculators, or WhatsApp), you consent to
                    us contacting you regarding your enquiry through the method
                    you've used or provided.
                </p>

                <h2 style={{ marginTop: 40 }}>6. Intellectual Property</h2>
                <p>
                    All content on this Site — including text, images, and
                    design — is owned by or licensed to Spaces And Beyond Real
                    Estate L.L.C. and may not be reproduced without permission.
                </p>

                <h2 style={{ marginTop: 40 }}>7. Limitation of Liability</h2>
                <p>
                    We are not liable for any loss or damage arising from your
                    use of this Site or reliance on information provided on it,
                    to the fullest extent permitted by UAE law.
                </p>

                <h2 style={{ marginTop: 40 }}>8. Governing Law</h2>
                <p>
                    These terms are governed by the laws of the United Arab
                    Emirates and the Emirate of Dubai.
                </p>

                <h2 style={{ marginTop: 40 }}>9. Contact Us</h2>
                <p>
                    Spaces And Beyond Real Estate L.L.C.
                    <br />
                    Office No. C-02-208, Building Owned by Saeed Bin Jumaa Bin Saeed Al Henai, Al Nahda 2, Dubai, UAE
                    <br />
                    Email: info@spacesandbeyond.ae
                    <br />
                    Phone: +971 50 951 5827
                </p>

            </main>
            <Footer content={content} />
        </>
    );
}
