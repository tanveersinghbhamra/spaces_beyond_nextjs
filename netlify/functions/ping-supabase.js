// netlify/functions/ping-supabase.js — Spaces & Beyond Real Estate
//
// A Netlify Scheduled Function — NOT a Next.js API route, this is a
// separate, native Netlify feature that runs on its own cron schedule,
// independent of any visitor traffic.
//
// Purpose: Supabase's free tier auto-pauses a project after 7 days with
// zero database activity. Real visitors already trigger activity via
// getContent.js on every page load, so this is only a safety net for a
// genuine stretch with no visitors at all (e.g. a slow period). Runs
// every 3 days — safely under the 7-day threshold with margin either way.
//
// Unaffected by the Supabase org transfer — the project ID and API keys
// stayed the same, only ownership changed, so no changes needed here.
//
// NOT YET VERIFIED running live on Netlify — built directly from
// Netlify's documented Scheduled Functions syntax. After deploying,
// check Netlify's function logs (Logs & metrics > Functions) after the
// first scheduled run to confirm it actually fired and succeeded.

export default async () => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        console.error(
            "[ping-supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY",
        );
        return new Response("Missing env vars", { status: 500 });
    }

    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/content?key=eq.main&select=key`,
            {
                headers: {
                    apikey: SUPABASE_SERVICE_KEY,
                    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
                },
            },
        );
        console.log("[ping-supabase] Ping sent, status:", res.status);
        return new Response("ok", { status: 200 });
    } catch (err) {
        console.error("[ping-supabase] Ping failed:", err.message);
        return new Response("error", { status: 500 });
    }
};

export const config = {
    schedule: "0 0 */3 * *", // every 3 days at midnight UTC
};
