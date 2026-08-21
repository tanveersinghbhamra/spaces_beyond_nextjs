import { DEFAULTS } from "./defaults";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getContent() {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.warn(
            "[getContent] Supabase env vars missing — serving defaults",
        );
        return DEFAULTS;
    }

    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/content?key=eq.main&select=value`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                },
                next: { revalidate: 30 },
            },
        );
        if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
        const rows = await res.json();
        if (!rows.length || !rows[0].value) return DEFAULTS;

        const saved = JSON.parse(rows[0].value);
        return {
            navbar: saved.navbar || DEFAULTS.navbar,
            hero: saved.hero || DEFAULTS.hero,
            about: saved.about || DEFAULTS.about,
            awards: saved.awards || DEFAULTS.awards,
            services: saved.services || DEFAULTS.services,
            review: saved.review || DEFAULTS.review,
            cta: saved.cta || DEFAULTS.cta,
            contact: saved.contact || DEFAULTS.contact,
            properties: saved.properties?.length
                ? saved.properties
                : DEFAULTS.properties,
            testimonials: saved.testimonials?.length
                ? saved.testimonials
                : DEFAULTS.testimonials,
            team: saved.team?.length ? saved.team : DEFAULTS.team,
        };
    } catch (err) {
        console.error("[getContent]", err.message);
        return DEFAULTS;
    }
}
