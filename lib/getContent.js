/**
 * lib/getContent.js
 *
 * This is the entire reason the Next.js migration solves the
 * staleness problem for good. Every time someone visits the site,
 * Next.js runs this function ON THE SERVER before sending any HTML
 * to the browser. It fetches whatever's currently in Supabase and
 * bakes it directly into the page that gets sent out.
 *
 * No client-side JS injection (cms.js is gone). No committing a
 * regenerated file to GitHub on every save (render-html.js is gone).
 * No "flash of old content then it updates" — the HTML the browser
 * receives is already correct, every single time, because it was
 * generated fresh for that exact request.
 *
 * `revalidate` controls how aggressively Next.js caches this. 30
 * means: serve a cached version for up to 30 seconds, then quietly
 * regenerate in the background on the next visit. Client edits show
 * up within 30 seconds, with none of the per-save deploy overhead
 * the old GitHub-commit approach had. Set to 0 for "always fetch
 * fresh, no caching at all" if that delay is ever a problem.
 */

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
                cache: "no-store", // always fetch fresh — Netlify's ISR/revalidate
                // support has known reliability issues, so we
                // skip caching entirely rather than risk stale
                // content that never updates
            },
        );
        if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
        const rows = await res.json();
        if (!rows.length || !rows[0].value) return DEFAULTS;

        const saved = JSON.parse(rows[0].value);
        // Merge saved data over defaults so any section the client
        // hasn't touched yet still has real content, not a blank gap.
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
        // Never let a Supabase hiccup break the page — fall back to
        // real content instead of an error screen.
        return DEFAULTS;
    }
}
