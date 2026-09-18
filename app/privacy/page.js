import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getContent } from "../../lib/getContent";

export const metadata = {
    title: "Privacy Policy | Spaces And Beyond Real Estate L.L.C",
    robots: "index, follow",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicy() {
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
                    Privacy Policy
                </h1>
                <p style={{ color: "#777", marginBottom: 40 }}>
                    Last updated: 10th September 2026
                </p>

                <p>
                    Spaces And Beyond Real Estate L.L.C. ("we", "us", "our")
                    operates spacesandbeyond.ae (the "Site"). This Privacy
                    Policy explains how we collect, use, and protect your
                    personal information when you visit our Site or contact us
                    through it.
                </p>

                <h2 style={{ marginTop: 40 }}>1. Information We Collect</h2>
                <p>
                    When you use our contact forms or calculator lead-capture
                    tools, we may collect: your name, email address, phone
                    number, WhatsApp number, and any message or property
                    interest details you provide.
                </p>

                <h2 style={{ marginTop: 40 }}>
                    2. How We Use Your Information
                </h2>
                <p>
                    We use the information you provide to respond to your
                    enquiry, send you relevant property information you've
                    requested, and improve our services. We do not sell your
                    personal information to third parties.
                </p>

                <h2 style={{ marginTop: 40 }}>
                    3. How Your Information Is Stored
                </h2>
                <p>
                    Enquiries submitted through this Site may be stored in our
                    customer relationship management (CRM) system, or sent to us
                    directly via WhatsApp or email, depending on which method
                    you use to contact us.
                </p>

                <h2 style={{ marginTop: 40 }}>4. Cookies &amp; Tracking</h2>
                <p>
                    This Site does not currently use cookies, Google Analytics,
                    Meta Pixel, or any other tracking or analytics tools. If
                    this changes in the future, this Privacy Policy will be
                    updated accordingly.
                </p>

                <h2 style={{ marginTop: 40 }}>5. Third-Party Services</h2>
                <p>
                    We may use third-party services to help operate this Site
                    and manage enquiries, including WhatsApp Business, our CRM
                    provider, and website hosting infrastructure. These
                    providers may process your information solely to help us
                    provide our services.
                </p>

                <h2 style={{ marginTop: 40 }}>6. Your Rights</h2>
                <p>
                    You may request access to, correction of, or deletion of
                    your personal information at any time by contacting us using
                    the details below.
                </p>

                <h2 style={{ marginTop: 40 }}>7. Contact Us</h2>
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
