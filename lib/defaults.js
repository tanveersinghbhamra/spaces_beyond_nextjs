/**
 * lib/defaults.js
 *
 * The real current content of the site. Used two places:
 *  1. lib/getContent.js — as the fallback when Supabase is empty,
 *     unreachable, or a client hasn't touched a given section yet.
 *  2. The admin panel's "Reset to Site Defaults" button.
 *
 * This is now the ONLY place this content is written down. In the
 * old vanilla-HTML version, the same data existed independently in
 * index.html, admin/index.html, and js/cms.js — three copies that
 * had to be manually kept in sync by hand, which is exactly how the
 * extension-casing and stale-content problems kept happening. There
 * is now exactly one copy.
 */
export const DEFAULTS = {
    navbar: {
        tagline: "Trusted Real estate Brokerage Firm in Dubai",
    },
    hero: {
        title: "Beyond Ordinary",
        title_em: "Real Estate.",
        btn_primary: "View Properties",
        btn_secondary: "Book Consultation",
        stat1_num: "$100M+",
        stat1_label: "In Transactions",
        stat2_num: "22+",
        stat2_label: "Years in Dubai",
        stat3_num: "8",
        stat3_label: "Countries of Experience",
        stat4_num: "8",
        stat4_label: "Languages Spoken",
    },
    about: {
        title: "Where",
        title_em: "Precision",
        title2: "Meets Property",
        p1: "Founded by three professionals who channelled precision into Dubai's real estate market. Since 2007, we've been at the epicentre of the city's most remarkable transformation.",
        p2: "Spaces & Beyond Real Estate LLC is not a typical brokerage. We are strategic partners, bringing data-driven insights, international networks, and over a decade of on-ground market expertise to every client relationship.",
    },
    awards: {
        lead: "A decade of results, recognized by the industry's most respected platforms and publications.",
        award1_img: "images/binghati.jpeg",
        award1_caption: "Broker Recognition Awards 2026",
        award2_img: "images/stageTrophy.jpeg",
        award2_caption: "On Stage at Binghatti Awards 2026",
    },
    services: {
        p1: "Buying, selling, leasing, or investing, every engagement gets the same standard of precision. From first viewing to final handover, our team manages the entire journey so you don't have to juggle six different specialists.",
        p2: "With $100M+ in transactions and a decade of on-ground expertise, we bring the same rigour to a first-time buyer as we do to a nine-figure portfolio.",
        img: "images/serviceImage.jpg",
        img_caption: "Dubai Marina",
        box1: {
            title: "Residential Sales",
            desc: "From luxury villas to premium apartments, matched to your lifestyle and investment goals.",
        },
        box2: {
            title: "Commercial Property",
            desc: "Office spaces and retail units structured to maximise returns across Dubai's business districts.",
        },
        box3: {
            title: "Investment Advisory",
            desc: "Data-driven strategy tailored to your risk appetite, positioning you ahead of the market.",
        },
        box4: {
            title: "Off-Plan Projects",
            desc: "Early access to Dubai's most anticipated developments through developer relationships.",
        },
        box5: {
            title: "Market Research",
            desc: "Comprehensive due diligence synthesising data and on-ground intelligence for every decision.",
        },
        box6: {
            title: "Client Concierge",
            desc: "White-glove support from first viewing to final handover, in your language.",
        },
    },
    review: {
        sub: "Your feedback helps us serve every client better. If we've exceeded your expectations, we'd be honoured by a 5-star review on Property Finder.",
        stars_label: "5 Stars on Property Finder",
        link_href: "https://www.propertyfinder.ae/en/agent/zaid-alazzam-328618",
    },
    cta: {
        eyebrow: "Ready to Begin?",
        sub: "Whether you're buying, selling, or investing, we're ready. Book a private consultation with our team today.",
    },
    contact: {
        phone_display: "+971 50 951 5827",
        phone_href: "https://wa.me/971509515827",
        whatsapp_href: "https://wa.me/971509515827",
        email: "info@spacesbeyond.ae",
        address: "Office 208-141-1, Mankhool, Dubai, UAE",
        instagram_handle: "@spaces_beyond.dxb",
        instagram_url: "https://www.instagram.com/spaces_beyond.dxb",
    },
    properties: [
        {
            id: "p1",
            name: "Dania District 2 Residence",
            location: "Midtown, Dubai Production City (IMPZ)",
            type: "apartment",
            badge: "For Sale",
            price: "AED 850,000",
            beds: "1",
            baths: "1",
            size: "621.29 sqft",
            images: [
                "images/p1-1.jpeg",
                "images/p1-2.jpeg",
                "images/p1-3.jpeg",
                "images/p1-4.jpeg",
                "images/p1-5.jpeg",
                "images/p1-6.jpeg",
                "images/p1-7.jpeg",
                "images/p1-8.jpeg",
            ],
        },
        {
            id: "p2",
            name: "Emerald Hills Estate",
            location: "Dubai Hills",
            type: "villa",
            badge: "Exclusive",
            price: "AED 36,500,000",
            beds: "5",
            baths: "5",
            size: "10,000 sqft",
            images: [
                "images/p2-1.png",
                "images/p2-3.png",
                "images/p2-4.png",
                "images/p2-5.png",
                "images/p2-6.png",
                "images/p2-7.png",
                "images/p2-8.png",
                "images/p2-9.png",
            ],
        },
        {
            id: "p3",
            name: "Paramount Furnished",
            location: "Picadilly Green, DAMAC Hills",
            type: "apartment",
            badge: "Sold",
            price: "AED 5,180,000",
            beds: "4",
            baths: "5",
            size: "3,487 sqft",
            images: [
                "images/p3-1.jpeg",
                "images/p3-2.jpeg",
                "images/p3-3.jpeg",
                "images/p3-4.jpeg",
                "images/p3-5.jpeg",
                "images/p3-6.jpeg",
                "images/p3-7.jpeg",
                "images/p3-8.jpeg",
            ],
        },
        {
            id: "p4",
            name: "Modern Creek Beach Community",
            location: "Creek Beach, Dubai Creek Harbour",
            type: "apartment",
            badge: "New Launch",
            price: "AED 2,000,000",
            beds: "1",
            baths: "1",
            size: "698 sqft",
            images: [
                "images/p4-1.jpeg",
                "images/p4-2.jpeg",
                "images/p4-3.jpeg",
                "images/p4-4.jpeg",
                "images/p4-5.jpeg",
                "images/p4-6.jpeg",
                "images/p4-7.jpeg",
                "images/p4-8.jpeg",
            ],
        },
    ],
    testimonials: [
        {
            id: "t1",
            name: "Ahmed Al-Rashid",
            from: "Investor · Abu Dhabi",
            text: "They didn't just find us a property, they found us the right investment at the right time. The level of market knowledge is extraordinary.",
        },
        {
            id: "t2",
            name: "Natalia Volkova",
            from: "Homeowner · Russia",
            text: "As a first-time buyer in Dubai, I was nervous. Their team walked me through every step with patience and expertise. Absolutely exceptional.",
        },
        {
            id: "t3",
            name: "Marcus Hoffmann",
            from: "Portfolio Investor · Germany",
            text: "The strategic insight they brought to our portfolio restructuring was unlike anything I've encountered from a Dubai agency. True professionals.",
        },
    ],
    team: [
        {
            id: "m1",
            role: "Founder & Managing Director",
            name_line1: "Zaid Alazzam",
            name_line2: "",
            bio: "A physician by training and an entrepreneur by instinct, I bring a uniquely analytical and globally informed perspective to real estate. Since relocating to Dubai in 2007, I have witnessed, and actively participated in, the city's remarkable transformation into a leading global property hub. My journey began as a property investor in 2014, and I have since led transactions exceeding $100 million in property sales. Having lived in seven countries and speaking four languages (Arabic, English, Russian, and German), I bring a truly international outlook to every client relationship, rooted in deep market knowledge and a commitment to long-term trust.",
            photo: "/images/firstOwner.jpeg",
            cred_value: "$100M+",
            cred_label: "In Property Transactions",
            languages: ["Arabic", "English", "Russian", "German"],
        },
        {
            id: "m2",
            role: "Owner & Chief Operating Officer",
            name_line1: "Saif Alazzam",
            name_line2: "",
            bio: "A dentist by training and an entrepreneur by instinct, I bring a level of precision, discipline, and strategic thinking that most of the market simply lacks. Having lived across six countries and speaking Arabic, English, and Russian, I understand not just property, but people, capital, and how global investors move. I entered real estate as an investor in 2014, well before stepping into brokerage in 2020. Today, as Owner and Operations Manager, I lead from the front: structuring opportunities, identifying timing advantages, and positioning clients ahead of the market. I work with clients who expect more: more insight, more strategy, and more results.",
            photo: "/images/secondOwner.jpeg",
            cred_value: "Since 2014",
            cred_label: "Active Dubai Property Investor",
            languages: ["Arabic", "English", "Russian"],
        },
        {
            id: "m3",
            role: "Founder & Chief Marketing Officer",
            name_line1: "Abdullah Alazam",
            name_line2: "",
            bio: "I lead brand strategy, marketing, and business development at Spaces & Beyond. With six-plus years across enterprise growth and strategic partnerships in the UAE and MENA region, I have generated over AED 36 million in revenue and built trusted relationships with leading developers and hospitality brands. I oversee our marketing, digital strategy, and business development end to end, ensuring every property gets maximum exposure through innovative campaigns and cutting-edge technology. I believe real estate is about relationships first, and transactions second.",
            photo: "/images/abdullah.jpeg",
            cred_value: "AED 36M+",
            cred_label: "In Revenue Generated",
            languages: ["Turkish", "German", "Spanish", "Kurdish"],
        },
    ],
};
