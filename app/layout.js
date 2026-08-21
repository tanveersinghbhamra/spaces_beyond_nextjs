import "./globals.css";
import CustomCursor from "../components/CustomCursor";

export const metadata = {
    title: "Spaces & Beyond Real Estate: Dubai's Premier Property Partner",
    description:
        "Dubai's premier luxury real estate brokerage. $100M+ in transactions. Buying, selling & investing across Dubai's finest addresses.",
    robots: "index, follow",
    alternates: {
        canonical: "https://spaces-and-beyond.vercel.app/",
    },
    icons: {
        icon: [
            {
                url: "/images/favicon-32.png",
                sizes: "32x32",
                type: "image/png",
            },
            { url: "/images/favicon.png", type: "image/png" },
        ],
        apple: "/images/favicon-180.png",
    },
    openGraph: {
        type: "website",
        locale: "en_AE",
        title: "Spaces & Beyond Real Estate: Dubai's Premier Property Partner",
        description:
            "$100M+ in transactions. Precision-driven, globally informed real estate advisory in Dubai.",
        url: "https://spaces-and-beyond.vercel.app",
        siteName: "Spaces & Beyond Real Estate",
        images: [
            {
                url: "https://spaces-and-beyond.vercel.app/images/previewImage.png",
                width: 1200,
                height: 630,
                alt: "Spaces & Beyond Real Estate — Dubai",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Spaces & Beyond Real Estate",
        description: "Dubai's premier luxury real estate brokerage.",
        images: [
            "https://spaces-and-beyond.vercel.app/images/previewImage.png",
        ],
    },
};

export const viewport = {
    themeColor: "#0A0A0A",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    // Structured data for search engines — RealEstateAgent
                    // schema, same as the vanilla-HTML version had.
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "RealEstateAgent",
                            name: "Spaces & Beyond Real Estate LLC",
                            image: "https://spaces-and-beyond.vercel.app/images/previewImage.png",
                            url: "https://spaces-and-beyond.vercel.app",
                            telephone: "+971509515827",
                            priceRange: "AED",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "Office 208-141-1, Mankhool",
                                addressLocality: "Dubai",
                                addressCountry: "AE",
                            },
                            areaServed: { "@type": "City", name: "Dubai" },
                            sameAs: [
                                "https://www.instagram.com/spaces_beyond.dxb",
                            ],
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: "4.9",
                                reviewCount: "150",
                            },
                        }),
                    }}
                />
            </head>
            <body>
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
