/**
 * app/api/content/route.js — Spaces & Beyond Real Estate
 *
 * Lets the admin panel fetch current saved content through the server,
 * instead of calling Supabase directly from the browser with
 * NEXT_PUBLIC_ vars. Those only get baked in at build time, and on
 * Netlify that step has been unreliable — this route uses the same
 * server-only env vars that /api/save and /api/upload already use
 * successfully, so there's one less thing that can silently break.
 */
export async function GET(request) {
    const adminKey = request.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorised" }, { status: 401 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        return Response.json(
            {
                error: "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in env vars",
            },
            { status: 500 },
        );
    }

    try {
        const r = await fetch(
            `${SUPABASE_URL}/rest/v1/content?key=eq.main&select=value`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                },
                cache: "no-store",
            },
        );
        if (!r.ok) throw new Error(`Supabase fetch failed: ${r.status}`);
        const rows = await r.json();
        return Response.json({ rows });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
