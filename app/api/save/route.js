/**
 * app/api/save/route.js — Spaces & Beyond Real Estate
 *
 * Saves admin panel content to Supabase. In the Next.js version this
 * is all that's needed — no GitHub-commit step, no regenerated HTML
 * file to push. Since app/page.js fetches fresh from Supabase on
 * every request (via lib/getContent.js), the moment this save
 * succeeds, the live site already reflects it. That's the entire
 * "solve staleness" mechanism — it's just how the page works, not a
 * separate sync step bolted on.
 */
export async function POST(request) {
    const adminKey = request.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorised" }, { status: 401 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        return Response.json(
            {
                error: "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in Vercel env vars",
            },
            { status: 500 },
        );
    }

    try {
        const body = await request.json();

        const r = await fetch(
            `${SUPABASE_URL}/rest/v1/content?on_conflict=key`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_SERVICE_KEY,
                    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
                    "Content-Type": "application/json",
                    Prefer: "resolution=merge-duplicates",
                },
                body: JSON.stringify({
                    key: "main",
                    value: JSON.stringify(body),
                }),
            },
        );

        if (!r.ok) {
            const e = await r.text();
            throw new Error(e);
        }

        return Response.json({ ok: true });
    } catch (err) {
        console.error("[save]", err.message);
        return Response.json({ error: err.message }, { status: 500 });
    }
}
